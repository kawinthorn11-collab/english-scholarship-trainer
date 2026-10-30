"""Record the teachers' fixed lines with neural voices (runs in GitHub Actions).

    node scripts/collectSpeech.mjs > speech-lines.json
    python scripts/recordVoices.py speech-lines.json public/voice

Uses the free neural voices of Microsoft Edge's Read Aloud through the
open-source `edge-tts` package (no API key). Already recorded clips are kept,
so only new or changed lines are recorded. Writes `manifest.json` listing the
clips that exist; the site falls back to the device's own voices for anything
missing, so a failed run never breaks the site.
"""

import asyncio
import json
import sys
from pathlib import Path

import edge_tts

VOICES = {
    # ครูหมูหวาน (and the narrator)
    ("f", "th"): ["th-TH-PremwadeeNeural"],
    ("f", "en"): ["en-US-AvaNeural", "en-US-JennyNeural"],
    # ครูควายขยัน
    ("m", "th"): ["th-TH-NiwatNeural"],
    ("m", "en"): ["en-US-AndrewNeural", "en-US-GuyNeural"],
}
# A touch slower than conversational speed for learners.
RATE = {"th": "-4%", "en": "-8%"}
CONCURRENCY = 6
RETRIES = 3


def lang_of(text: str) -> str:
    return "th" if any("฀" <= ch <= "๿" for ch in text) else "en"


async def record(line: dict, out_dir: Path, sem: asyncio.Semaphore) -> bool:
    target = out_dir / f"{line['key']}.mp3"
    if target.exists() and target.stat().st_size > 0:
        return True
    lang = lang_of(line["text"])
    async with sem:
        for voice in VOICES[(line["voice"], lang)]:
            for attempt in range(RETRIES):
                tmp = target.with_suffix(".part")
                try:
                    await edge_tts.Communicate(line["text"], voice, rate=RATE[lang]).save(str(tmp))
                    if tmp.stat().st_size == 0:
                        raise RuntimeError("empty audio")
                    tmp.rename(target)
                    return True
                except Exception as error:  # network hiccups, throttling, unknown voice
                    tmp.unlink(missing_ok=True)
                    print(f"  retry {attempt + 1} {voice}: {error}", file=sys.stderr)
                    await asyncio.sleep(2 ** attempt)
    print(f"  failed: {line['text'][:60]}", file=sys.stderr)
    return False


async def main(lines_path: str, out_dir_path: str) -> None:
    lines = json.loads(Path(lines_path).read_text(encoding="utf-8"))
    out_dir = Path(out_dir_path)
    out_dir.mkdir(parents=True, exist_ok=True)

    sem = asyncio.Semaphore(CONCURRENCY)
    results = await asyncio.gather(*(record(line, out_dir, sem) for line in lines))

    keep = {line["key"] for line, ok in zip(lines, results) if ok}
    for stale in out_dir.glob("*.mp3"):
        if stale.stem not in keep:
            stale.unlink()
    (out_dir / "manifest.json").write_text(json.dumps(sorted(keep)), encoding="utf-8")
    print(f"recorded {len(keep)} of {len(lines)} clips")


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1], sys.argv[2]))

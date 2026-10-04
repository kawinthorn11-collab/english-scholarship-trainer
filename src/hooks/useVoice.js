import { useSyncExternalStore } from 'react'
import { getVoiceState, subscribeVoice } from '../utils/voice'

/** Current speaker ({ speaker, lineId }) of the character voice engine. */
export function useVoice() {
  return useSyncExternalStore(subscribeVoice, getVoiceState, getVoiceState)
}

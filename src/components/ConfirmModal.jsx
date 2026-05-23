export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-xl border border-purple-600/50 bg-[#1a0a2e] p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-bold text-purple-100">{title}</h3>
        <p className="mb-6 text-sm text-purple-300">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-200 transition hover:bg-purple-900/40"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

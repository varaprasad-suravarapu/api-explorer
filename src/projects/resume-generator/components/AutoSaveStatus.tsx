import { Check, LoaderCircle } from "lucide-react"

interface AutoSaveStatusProps {
  status: string
}

const AutoSaveStatus = ({ status }: AutoSaveStatusProps) => {
  if (!status) return null

  const isSaving = status === "Auto Saving..."

  return (
    <span className="flex items-center justify-end gap-2 text-xs font-medium text-emerald-600">
      {isSaving ? (
        <LoaderCircle size={14} className="animate-spin" />
      ) : (
        <Check size={14} />
      )}

      <span>{status}</span>
    </span>
  )
}

export default AutoSaveStatus
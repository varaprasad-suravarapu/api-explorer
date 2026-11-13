import type {ChangeEvent} from "react"

interface TextareaProps {
  label: string
  name: string
  value: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
  cssStyles?: string
  rows?: number
}

const Textarea = ({
  label,
  name,
  value,
  placeholder = "",
  onChange,
  required = false,
  disabled = false,
  cssStyles = "",
  rows = 4,
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        name={name}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 ${cssStyles}`}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Textarea

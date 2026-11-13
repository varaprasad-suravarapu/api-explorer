import type { ChangeEvent } from "react"

interface CheckboxProps {
  label: string
  name: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  cssStyles?: string
}

const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  required = false,
  disabled = false,
  cssStyles = "",
}: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed ${cssStyles}`}
      />

      <label
        htmlFor={name}
        className="cursor-pointer text-sm font-medium text-slate-700"
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
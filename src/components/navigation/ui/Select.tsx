import type {ChangeEvent} from "react"

interface SelectProps {
  label: string
  name: string
  value: string
  options: {label: string; value: string}[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  disabled?: boolean
  cssStyles?: string
  placeholder?: string
}

const Select = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
  cssStyles = "",
  placeholder = "Select an option",
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 ${cssStyles}`}
        required={required}
        disabled={disabled}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

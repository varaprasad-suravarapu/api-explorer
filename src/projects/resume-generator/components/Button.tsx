import type { LucideIcon } from "lucide-react"

type ButtonTypes = "button" | "submit" | "reset"

interface ButtonProps {
  cssStyles?: string
  title: string
  Icon?: LucideIcon
  handler?: () => void;
  iconSize?: number;
  type?: ButtonTypes;
}

const Button = ({
  title,
  cssStyles = "",
  Icon,
  iconSize = 14,
  handler,
  type = "button"
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`cursor-pointer flex gap-2 justify-center items-center ${cssStyles}`}
      onClick={handler}
    >
      {Icon && <Icon size={iconSize} />}
      {title}
    </button>
  )
}

export default Button

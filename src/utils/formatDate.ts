const formatDate = (date: string): string => {
  if (!date) return ""

  const [year, month] = date.split("-")

  return `${month}/${year}`
}

export default formatDate
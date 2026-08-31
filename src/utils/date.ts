export const formattedDate = (
  date: string,
  locale: string = 'es-CL',
): string => {
  const [day, month, year] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const parseDate = (dateStr: string): number => {
  const [day, month, year] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).getTime()
}

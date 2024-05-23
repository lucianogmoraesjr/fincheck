export function dateFormatter(date: Date) {
  return Intl.DateTimeFormat('pt-BR').format(date);
}

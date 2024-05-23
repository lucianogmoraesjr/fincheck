function format(value: number) {
  if (value === null || Number.isNaN(value)) {
    return '';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function parse(value: string) {
  const normalizedValue = value.replace(/\./g, '').replace(',', '.');

  if (Number.isNaN(normalizedValue)) {
    return 0;
  }

  return parseFloat(normalizedValue);
}

export const currencyFormatter = {
  format,
  parse,
};

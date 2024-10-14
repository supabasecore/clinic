type Decimal = {
  number: number;
  fixed?: boolean | null;
};

export const formatNumber = (
  num: number,
  decimalPrecision: number = 1,
  customAbbreviations: string[] = ["", "k", "M", "B", "T"]
): string => {
  if (num >= 1000) {
    const log1000Scale = Math.floor(Math.log10(num) / 3);
    const abbreviation =
      customAbbreviations[log1000Scale] ||
      customAbbreviations[customAbbreviations.length - 1];

    const scaledNum = num / Math.pow(10, log1000Scale * 3);
    const formattedNum = scaledNum.toFixed(decimalPrecision);

    return formattedNum + abbreviation;
  } else {
    return num.toString();
  }
};

export function formatNumberWithCommas({ number, fixed }: Decimal): string {
  if (!fixed) {
    const formattedNumber = number.toFixed(2);
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const roundDecimals = (number: number, decimals: number): string => {
  const factor = Math.pow(10, decimals);
  const multipliedNumber = number * factor;

  const roundedNumber = Math.round(multipliedNumber);

  const result = roundedNumber / factor;

  return result.toFixed(decimals);
};

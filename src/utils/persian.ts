/**
 Converts English digits (0-9) to Persian digits (۰-۹)
 */
export function toPersianDigits(input: string | number): string {
  if (input === undefined || input === null) return '';
  const str = String(input);
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return str.replace(/[0-9]/g, (match) => {
    return persianDigits[englishDigits.indexOf(match)];
  });
}

/**
 Formats numeric price into Persian formatted string: e.g. 1250000 -> "۱,۲۵۰,۰۰۰ تومان"
 */
export function formatPrice(price: number): string {
  if (isNaN(price)) return '۰ تومان';
  const formattedNumber = new Intl.NumberFormat('en-US').format(price);
  return `${toPersianDigits(formattedNumber)} تومان`;
}

/**
 Formats number only with Persian commas, without 'تومان' suffix
 */
export function formatPersianNumber(num: number): string {
  if (isNaN(num)) return '۰';
  const formattedNumber = new Intl.NumberFormat('en-US').format(num);
  return toPersianDigits(formattedNumber);
}

/**
 Converts Persian/Arabic digits back to English digits for math parsing
 */
export function toEnglishDigits(str: string): string {
  const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicDigits = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
  
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(persianDigits[i], String(i)).replace(arabicDigits[i], String(i));
  }
  return result;
}

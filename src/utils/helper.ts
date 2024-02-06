// Function to convert a number to Roman numeral
const convertToRoman = (num: number) => {
  const romanNumerals: any = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
  };
  let result = '';
  for (let key in romanNumerals) {
    while (num >= romanNumerals[key]) {
        result += key;
        num -= romanNumerals[key];
    }
  }
  return result;
}
export const getTodayDateInRomanNumeral = () => {
  // Get today's date
  const today = new Date();
  // Convert day, month, and year to Roman numeral
  const day = convertToRoman(today.getDate());
  const month = convertToRoman(today.getMonth() + 1); // Month is zero-based
  const year = convertToRoman(today.getFullYear() % 100); // Get last two digits of the year
  // Format the date as DD-MM-YY
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

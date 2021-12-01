// Converts float array to a string
export function floatArr2String(
  arr: number[],
  fixedNumPlaces: number = 3
): string {
  let displayStr = "";
  for (let i = 0; i < arr.length; i++) {
    displayStr = displayStr.concat(arr[i].toFixed(fixedNumPlaces));
    if (i !== arr.length - 1) {
      displayStr = displayStr.concat(", ");
    }
  }

  return displayStr;
}

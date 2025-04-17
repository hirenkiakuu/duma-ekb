export function formatSheetNumber(sheetNumber: number | string): string {
  const parsedSheetNumber = Number(sheetNumber);
  return parsedSheetNumber % 1 === 0
    ? `${parsedSheetNumber}`
    : `${Math.floor(parsedSheetNumber)} об.`;
}

export function normalizeCC(str: string) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export function compare<T extends { [key: string]: unknown }>(sortBy: keyof T) {
  return (a: T, b: T): number => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  };
}

export const compareByDateFn = (fieldName: string) => {
  return (a, b) => {
    const dateA = a[fieldName];
    const dateB = b[fieldName];
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };
}



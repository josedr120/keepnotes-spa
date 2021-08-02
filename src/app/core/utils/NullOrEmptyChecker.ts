export const IsEmptyOrNull = (value: string): boolean => {
   return value === null || 0 >= value.length;
};

export const isExist = <T>(value: T | null | undefined): value is NonNullable<T> =>
  value !== undefined && value !== null;

export const isFunction = (value?: any): value is Function => value instanceof Function;

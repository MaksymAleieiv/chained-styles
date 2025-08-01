import { combine } from "flexible-chain";

export const generateStyle = <
  T extends Record<string, string>,
  U extends Record<string, any>,
  V extends Record<string, any>,
  W extends Record<string, any>
>(
  colors: T,
  additionalStyles: U,
  defaultStyles: V,
  styledComponents: W
) => {
  const styleColors = Object.entries(colors).reduce(
    (acc, [key, color]) => ({ ...acc, [key]: { color: color } }),
    {} as Record<keyof T, { color: keyof T }>
  );

  const styleBgColors = Object.entries(colors).reduce(
    (acc, [key, color]) => ({
      ...acc,
      [`${key}Bg`]: { backgroundColor: color },
    }),
    {} as Record<`${string & keyof T}Bg`, { backgroundColor: keyof T }>
  );

  return combine(
    { ...defaultStyles, ...styleColors, ...styleBgColors, ...additionalStyles },
    styledComponents
  );
};

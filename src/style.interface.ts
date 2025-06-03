export type ChainedStylesColorsType = Record<string | number, string>;

export interface ChainedStylesInterface {
  getSize: (size: number) => number;
}

export interface Theme {}

export interface ThemeInterface extends Theme, ChainedStylesInterface {}

export type ChainedStylesThemeType<T extends Record<string, any> = object> = T & {
  theme: ThemeInterface
};

import { Theme } from 'chained-styles';

export type ChainedStylesColorsType = Record<string | number, string>;

export interface ChainedStylesInterface {
  getSize: (size: number) => number;
}

export type ChainedStylesThemeType<T extends Record<string, any> = object> = T & {
  theme: Theme;
};

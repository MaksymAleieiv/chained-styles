import { ChainedStylesThemeType } from '../style.interface';

export const StylePosition = {
  Absolute: {
    position: 'absolute',
  },
  Relative: {
    position: 'relative',
  },
  Index: (zIndex: number) => ({ zIndex }),
  Top: (size: number) => ({ getPropertyTop: ({ theme }: ChainedStylesThemeType) => ({ top: theme.getSize(size) }) }),
  Right: (size: number) => ({
    getPropertyRight: ({ theme }: ChainedStylesThemeType) => ({ right: theme.getSize(size) }),
  }),
  Left: (size: number) => ({
    getPropertyLeft: ({ theme }: ChainedStylesThemeType) => ({ left: theme.getSize(size) }),
  }),
  Bottom: (size: number) => ({
    getPropertyBottom: ({ theme }: ChainedStylesThemeType) => ({ bottom: theme.getSize(size) }),
  }),
};

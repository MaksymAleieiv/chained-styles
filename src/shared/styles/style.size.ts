import { ChainedStylesThemeType } from '../style.interface';

export const StyleSize = {
  Width: (size: number) => ({
    getPropertyWidth: ({ theme }: ChainedStylesThemeType) => ({
      width: theme.getSize(size),
    }),
  }),
  MaxWidth: (size: number) => ({
    getPropertyMaxWidth: ({ theme }: ChainedStylesThemeType) => ({
      maxWidth: theme.getSize(size),
    }),
  }),
  MinWidth: (size: number) => ({
    getPropertyMinWidth: ({ theme }: ChainedStylesThemeType) => ({
      minWidth: theme.getSize(size),
    }),
  }),
  Height: (size: number) => ({
    getPropertyHeight: ({ theme }: ChainedStylesThemeType) => ({
      height: theme.getSize(size),
    }),
  }),
  MinHeight: (size: number) => ({
    getPropertyMinHeight: ({ theme }: ChainedStylesThemeType) => ({
      minHeight: theme.getSize(size),
    }),
  }),
  MaxHeight: (size: number) => ({
    getPropertyMaxHeight: ({ theme }: ChainedStylesThemeType) => ({
      maxHeight: theme.getSize(size),
    }),
  }),
  // eslint-disable-next-line max-params
  Radius: (
    topLeftOrVertical: number = 1,
    topRightOrHorizontal = topLeftOrVertical,
    bottomRight = topLeftOrVertical,
    bottomLeft = topRightOrHorizontal ?? topLeftOrVertical,
  ) => ({
    getPropertyRadius: ({ theme }: ChainedStylesThemeType) => ({
      borderTopLeftRadius: theme.getSize(topLeftOrVertical),
      borderTopRightRadius: theme.getSize(topRightOrHorizontal),
      borderBottomRightRadius: theme.getSize(bottomRight),
      borderBottomLeftRadius: theme.getSize(bottomLeft),
    }),
  }),
  Padding: (...sizes: number[]) => ({
    getPropertyPadding: ({ theme }: ChainedStylesThemeType) => ({
      padding: sizes.map(size => theme.getSize(size)).join(' '),
    }),
  }),
  PaddingTop: (size: number) => ({
    getPropertyPaddingTop: ({ theme }: ChainedStylesThemeType) => ({
      paddingTop: theme.getSize(size),
    }),
  }),
  PaddingBottom: (size: number) => ({
    getPropertyPaddingBottom: ({ theme }: ChainedStylesThemeType) => ({
      paddingBottom: theme.getSize(size),
    }),
  }),
  PaddingLeft: (size: number) => ({
    getPropertyPaddingLeft: ({ theme }: ChainedStylesThemeType) => ({
      paddingLeft: theme.getSize(size),
    }),
  }),
  PaddingRight: (size: number) => ({
    getPropertyPaddingRight: ({ theme }: ChainedStylesThemeType) => ({
      paddingRight: theme.getSize(size),
    }),
  }),
  Margin: (...sizes: number[]) => ({
    getPropertyMargin: ({ theme }: ChainedStylesThemeType) => ({
      margin: sizes.map(size => theme.getSize(size)).join(' '),
    }),
  }),
  MarginTop: (size: number) => ({
    getPropertyMarginTop: ({ theme }: ChainedStylesThemeType) => ({
      marginTop: theme.getSize(size),
    }),
  }),
  MarginRight: (size: number) => ({
    getPropertyMarginRight: ({ theme }: ChainedStylesThemeType) => ({
      marginRight: theme.getSize(size),
    }),
  }),
  MarginBottom: (size: number) => ({
    getPropertyMarginBottom: ({ theme }: ChainedStylesThemeType) => ({
      marginBottom: theme.getSize(size),
    }),
  }),
  MarginLeft: (size: number) => ({
    getPropertyMarginLeft: ({ theme }: ChainedStylesThemeType) => ({
      marginLeft: theme.getSize(size),
    }),
  }),
};

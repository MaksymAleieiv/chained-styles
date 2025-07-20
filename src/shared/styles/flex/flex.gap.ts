import { ChainedStylesThemeType } from '../../style.interface';

export const flexGap = {
  RowGap: (size: number) => ({
    getPropertyRowGap: ({ theme }: ChainedStylesThemeType) => ({
      rowGap: theme.getSize(size),
    }),
  }),
  ColumnGap: (size: number) => ({
    getPropertyColumnGap: ({ theme }: ChainedStylesThemeType) => ({
      columnGap: theme.getSize(size),
    }),
  }),
};

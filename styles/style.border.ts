import { isExist } from '../utils/is-type.util';
import { CSSProperties } from 'styled-components/native';

interface DirectionProps {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface BorderProps {
  width: number;
  style: CSSProperties['borderStyle'];
  directions: Partial<DirectionProps>;
}

const initialProps: Omit<BorderProps, 'directions'> = {
  width: 1,
  style: 'solid',
};

export const getBorderStyles = ({
  width = initialProps.width,
  style = initialProps.style,
  directions,
}: Partial<BorderProps> = initialProps) => {
  if (isExist(directions)) {
    return {
      borderStyle: style,
      borderTopWidth: isExist(directions.top) ? width : undefined,
      borderRightWidth: isExist(directions.right) ? width : undefined,
      borderBottomWidth: isExist(directions.bottom) ? width : undefined,
      borderLeftWidth: isExist(directions.left) ? width : undefined,
    };
  }

  return {
    borderWidth: width,
    borderStyle: style,
  };
};

export const StyleBorder = {
  Border: (borderColor: string, borderProps?: Partial<BorderProps>) => {
    const borderStyles = getBorderStyles(borderProps);

    return {
      ...borderStyles,
      borderColor,
    };
  },
};

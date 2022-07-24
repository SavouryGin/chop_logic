import { CommonProps } from './general';

export type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'bottom';
  children?: React.ReactElement | string;
};

import React from 'react';
import { CommonProps } from 'types';
import { useHover } from 'hooks';
import './styles.scss';

type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  children?: React.ReactElement | string;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  console.log(isHovered);
  const tooltipContainer = <span className='tooltip__container'>{text}</span>;

  return (
    <span ref={hoverRef} className='tooltip'>
      {isHovered && tooltipContainer}
      {children}
    </span>
  );
};

export default Tooltip;

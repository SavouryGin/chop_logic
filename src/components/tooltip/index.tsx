import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { useHover } from 'hooks';
import './styles.scss';

type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'bottom';
  children?: React.ReactElement | string;
};

const Tooltip = ({ text, children, position = 'bottom' }: TooltipProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const containerClass = formatClassName(['tooltip__container', `tooltip__container_${position}`]);
  console.log(isHovered);
  const tooltipContainer = <div className={containerClass}>{text}</div>;

  return (
    <div ref={hoverRef} className='tooltip'>
      {isHovered && tooltipContainer}
      {children}
    </div>
  );
};

export default Tooltip;

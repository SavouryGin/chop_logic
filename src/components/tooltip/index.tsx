import React, { ReactElement, useMemo, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import './styles.scss';

type TooltipProps = CommonProps & {
  text: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  children?: ReactElement | string;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipClass = useMemo(() => {
    return formatClassName(['tooltip__container', { tooltip__container_visible: isTooltipVisible }]);
  }, [isTooltipVisible]);

  const onHover = () => {
    setIsTooltipVisible(true);
  };

  const onLeave = () => {
    setIsTooltipVisible(false);
  };

  const tooltipContainer = (
    <div className={tooltipClass}>
      <div className='tooltip__arrow'></div>
      <div className='tooltip__text'>{text}</div>
    </div>
  );

  return (
    <div className='tooltip' onMouseOver={onHover} onMouseLeave={onLeave}>
      {isTooltipVisible && tooltipContainer}
      {children}
    </div>
  );
};

export default Tooltip;

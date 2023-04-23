import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Spinner = (): React.ReactElement => {
  const isDark = useAppSelector(settingsSelectors.isDarkMode);
  const color = isDark ? '#97d8b2' : '#f96e67';
  const wrapperClass = formatClass(['spinner__wrapper', { spinner__wrapper_dark: isDark }]);

  return (
    <div className={wrapperClass}>
      <div className='spinner'>
        <div className='spinner__center' style={{ background: color }}></div>
        <div className='spinner__inner-spin'>
          <div className='spinner__inner-arc spinner__inner-arc_start-a' style={{ borderColor: color }}></div>
          <div className='spinner__inner-arc spinner__inner-arc_end-a' style={{ borderColor: color }}></div>
          <div className='spinner__inner-arc spinner__inner-arc_start-b' style={{ borderColor: color }}></div>
          <div className='spinner__inner-arc spinner__inner-arc_end-b' style={{ borderColor: color }}></div>
          <div className='spinner__inner-moon-a' style={{ background: color }}></div>
          <div className='spinner__inner-moon-b' style={{ background: color }}></div>
        </div>
        <div className='spinner__outer-spin'>
          <div className='spinner__outer-arc spinner__outer-arc_start-a' style={{ borderColor: color }}></div>
          <div className='spinner__outer-arc spinner__outer-arc_end-a' style={{ borderColor: color }}></div>
          <div className='spinner__outer-arc spinner__outer-arc_start-b' style={{ borderColor: color }}></div>
          <div className='spinner__outer-arc spinner__outer-arc_end-b' style={{ borderColor: color }}></div>
          <div className='spinner__outer-moon-a' style={{ background: color }}></div>
          <div className='spinner__outer-moon-b' style={{ background: color }}></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

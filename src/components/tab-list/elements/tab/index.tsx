import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { TabProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
import { useAppSelector } from 'hooks';

const Tab = ({ title, onSelect, tabId, isActive }: TabProps): React.ReactElement => {
  const classNames = formatClass(['tab-list__tab', { 'tab-list__tab_active': isActive }]);
  const isSoundEnabled = useAppSelector(settingsSelectors.isSoundsEnabled);
  const language = useAppSelector(settingsSelectors.language);

  const onClickTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    onSelect(tabId);
    if (isSoundEnabled) {
      void soundPlayer.seatbelt.play();
    }
  };

  return (
    <h3 role='tab' id={tabId} onClick={onClickTab} className={classNames} aria-selected={isActive} data-testid={tabId}>
      {title[language]}
    </h3>
  );
};

export default Tab;

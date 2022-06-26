import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { TabProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';

const Tab = ({ title, onSelect, tabId, isActive }: TabProps) => {
  const classNames = formatClassName(['tab-list__tab', { 'tab-list__tab_active': isActive }]);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const onClickTab = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    onSelect(tabId);
    if (isSoundEnabled) {
      soundPlayer.seatbelt.play();
    }
  };

  return (
    <h3 role='tab' id={tabId} onClick={onClickTab} className={classNames} aria-selected={isActive} data-testid={tabId}>
      {title[language]}
    </h3>
  );
};

export default Tab;

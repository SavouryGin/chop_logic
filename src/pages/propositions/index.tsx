import React from 'react';
import TabList from 'components/tab-list';
import formatClassName from 'helpers/formatters/format-class-name';
import { Icon } from 'enums';
import { propositionsTabs } from 'presets/propositions';
import { settingsSelectors } from 'store/settings/selectors';
import { titles } from 'texts/propositions';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Propositions = () => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  return (
    <article className='propositions'>
      <h2 className={formatClassName(['propositions__title', Icon.Propositions])}>{titles.page[language]}</h2>
      <TabList tabs={propositionsTabs} className='propositions__tabs' />
    </article>
  );
};

export default Propositions;

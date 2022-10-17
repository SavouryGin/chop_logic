import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { titles } from 'texts/propositions';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsIntroduction = () => {
  const language = useAppSelector(settingsSelectors.getLanguage);

  return (
    <article className='propositions-introduction'>
      <h2 className={formatClassName(['propositions-introduction__title', Icon.Propositions])}>{titles.page[language]}</h2>
      <div>Introduction</div>
    </article>
  );
};

export default PropositionsIntroduction;

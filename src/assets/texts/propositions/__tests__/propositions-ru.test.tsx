import DPAxiomsRu from 'assets/texts/propositions/ru/dp-axioms-ru';
import DPDefinitionsRu from 'assets/texts/propositions/ru/dp-definitions-ru';
import NPDefinitionsRu from 'assets/texts/propositions/ru/np-definitions-ru';
import NPHeuristicsRu from 'assets/texts/propositions/ru/np-heuristics-ru';
import NPRulesRu from 'assets/texts/propositions/ru/np-rules-ru';
import React from 'react';
import { render } from '@testing-library/react';

describe('Propositions RU text components:', () => {
  it('DPAxiomsRu should match the snapshot', () => {
    const { asFragment } = render(<DPAxiomsRu />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('DPDefinitionsRu should match the snapshot', () => {
    const { asFragment } = render(<DPDefinitionsRu className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('DPDefinitionsRu should match the snapshot', () => {
    const { asFragment } = render(<NPDefinitionsRu className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('NPHeuristicsRu should match the snapshot', () => {
    const { asFragment } = render(<NPHeuristicsRu className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('NPHeuristicsRu should match the snapshot', () => {
    const { asFragment } = render(<NPRulesRu className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

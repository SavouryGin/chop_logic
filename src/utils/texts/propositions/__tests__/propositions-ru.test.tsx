import DPAxiomsRu from 'utils/texts/propositions/ru/dp-axioms';
import DPDefinitionsRu from 'utils/texts/propositions/ru/dp-definitions';
import NPDefinitionsRu from 'utils/texts/propositions/ru/np-definitions';
import NPHeuristicsRu from 'utils/texts/propositions/ru/np-heuristics';
import NPRulesRu from 'utils/texts/propositions/ru/np-rules';
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

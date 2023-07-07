import DPAxiomsEn from 'utils/texts/propositions/en/dp-axioms-en';
import DPDefinitionsEn from 'utils/texts/propositions/en/dp-definitions-en';
import NPDefinitionsEn from 'utils/texts/propositions/en/np-definitions-en';
import NPHeuristicsEn from 'utils/texts/propositions/en/np-heuristics-en';
import NPRulesEn from 'utils/texts/propositions/en/np-rules-en';
import React from 'react';
import { render } from '@testing-library/react';

describe('Propositions EN text components:', () => {
  it('DPAxiomsEn should match the snapshot', () => {
    const { asFragment } = render(<DPAxiomsEn />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('DPDefinitionsEn should match the snapshot', () => {
    const { asFragment } = render(<DPDefinitionsEn className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('NPDefinitionsEn should match the snapshot', () => {
    const { asFragment } = render(<NPDefinitionsEn className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('NPHeuristicsEn should match the snapshot', () => {
    const { asFragment } = render(<NPHeuristicsEn className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('NPHeuristicsEn should match the snapshot', () => {
    const { asFragment } = render(<NPRulesEn className={'test-class-name'} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

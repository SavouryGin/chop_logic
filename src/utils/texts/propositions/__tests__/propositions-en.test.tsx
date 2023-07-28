import DPAxiomsEn from 'utils/texts/propositions/en/dp-axioms';
import DPDefinitionsEn from 'utils/texts/propositions/en/dp-definitions';
import NPDefinitionsEn from 'utils/texts/propositions/en/np-definitions';
import NPHeuristicsEn from 'utils/texts/propositions/en/np-heuristics';
import NPRulesEn from 'utils/texts/propositions/en/np-rules';
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

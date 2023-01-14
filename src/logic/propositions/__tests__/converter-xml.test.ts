import converterXML from 'logic/propositions/converter-xml';
import tMocks from '__mocks__/data/propositions/table-items';

describe('Propositions xml converter tests', () => {
  it('dpToXML() method returns a correct array of dp table items', () => {
    const fileData = converterXML.dpToXML(tMocks.dpTableDataIE);
    expect(fileData).toEqual(tMocks.dpIEtoXML);
  });

  it('npToXML() method returns a correct array of np table items', () => {
    const fileData = converterXML.npToXML(tMocks.randomNaturalProof);
    expect(fileData).toEqual(tMocks.randomNaturalProofXML);
  });
});

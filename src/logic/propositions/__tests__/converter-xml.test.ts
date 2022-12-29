import converterXML from 'logic/propositions/converter-xml';
import tMocks from '__mocks__/data/propositions/table-items';
// import { PropositionalError } from 'errors/propositional-error';

describe('Propositions xml converter tests', () => {
  it('dpToXML() method returns a correct array of dp table items', () => {
    const fileData = converterXML.dpToXML(tMocks.dpTableDataIE);
    expect(fileData).toEqual(tMocks.dpIEtoXML);
  });
});

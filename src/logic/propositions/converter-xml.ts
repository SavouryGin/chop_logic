import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';

const converterXML = {
  convertDPtoXML(tableData: DirectProofsTableItem[]): string {
    console.log(tableData);
    const mockData = `<note>Hello</note>`;

    return mockData;
  },
};

export default Object.freeze(converterXML);

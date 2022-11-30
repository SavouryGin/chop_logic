import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';

const converterXML = {
  convertDPtoXML(tableData: DirectProofsTableItem[]): string {
    console.log(tableData);

    return `<propositionsDirectProof>\n${this.convertItemsArrayToXML(tableData)}\n</propositionsDirectProof>`;
  },

  convertItemsArrayToXML(data: DirectProofsTableItem[]): string {
    const itemsArray = data.map((item) => `    <tableItem>\n${JSON.stringify(item)}\n    </tableItem>`);

    return itemsArray.join('\n');
  },
};

export default Object.freeze(converterXML);

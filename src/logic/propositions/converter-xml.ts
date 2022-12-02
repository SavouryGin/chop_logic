import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';

const converterXML = {
  dpToXML(tableData: DirectProofsTableItem[]): string {
    console.log(tableData);

    return `<propositionsDirectProof>\n${this.dpArrayToXML(tableData)}\n</propositionsDirectProof>`;
  },

  dpArrayToXML(data: DirectProofsTableItem[]): string {
    const itemsArray = data.map((item) => this.dpItemToXML(item));

    return itemsArray.join('\n');
  },

  dpItemToXML(item: DirectProofsTableItem): string {
    const expression = JSON.stringify(item.expression);
    const friendlyExpression = JSON.stringify(item.friendlyExpression);
    const formula = JSON.stringify(item.formula);
    const comment = JSON.stringify(item.comment);
    const dependentOn = JSON.stringify(item.dependentOn);

    const xml = `
    <tableItem>
    ${this.idToXML(item.id)}
    ${this.stepToXML(item.step)}
    ${this.rawInputToXML(item.rawInput)}
    ${comment}
    ${dependentOn}
    ${formula}
    ${expression}
    ${friendlyExpression}
    </tableItem>
    `;

    console.log(xml);

    return 'mockItem';
  },

  idToXML(id: string): string {
    return `<id>${id}</id>`;
  },

  stepToXML(step: number): string {
    return `<step>${step}</step>`;
  },

  rawInputToXML(rawInput: string): string {
    return `<rawInput>${rawInput}</rawInput>`;
  },
};

export default Object.freeze(converterXML);

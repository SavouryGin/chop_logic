import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { Language, LocalText } from 'types';

const converterXML = {
  dpToXML(tableData: DirectProofsTableItem[]): string {
    return `<propositionsDirectProof>${this.dpArrayToXML(tableData)}\n</propositionsDirectProof>`;
  },

  dpArrayToXML(data: DirectProofsTableItem[]): string {
    const itemsArray = data.map((item) => this.dpItemToXML(item));

    return itemsArray.join('');
  },

  dpItemToXML(item: DirectProofsTableItem): string {
    const expression = JSON.stringify(item.expression);
    const friendlyExpression = JSON.stringify(item.friendlyExpression);
    const formula = JSON.stringify(item.formula);
    const dependentOn = JSON.stringify(item.dependentOn);

    const xml = `
  <tableItem>
    ${this.idToXML(item.id)}
    ${this.stepToXML(item.step)}
    ${this.rawInputToXML(item.rawInput)}
    ${this.commentToXML(item.comment)}
    ${dependentOn}
    ${formula}
    ${expression}
    ${friendlyExpression}
  </tableItem>`;

    console.log(xml);

    return xml;
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

  commentToXML(comment: string | LocalText): string {
    if (typeof comment === 'string') {
      return `<comment>${comment}</comment>`;
    } else {
      const pairs = [];

      for (const lang in comment) {
        const pair = `<${lang}>${comment[lang as Language]}</${lang}>`;
        pairs.push(pair);
      }

      return `<comment>${pairs.join('')}</comment>`;
    }
  },
};

export default Object.freeze(converterXML);

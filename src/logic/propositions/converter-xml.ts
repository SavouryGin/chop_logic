import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { Language, LocalText, PropositionalFormula } from 'types';
import { PropositionalOperator } from 'enums';

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

    const xml = `
  <tableItem>
    ${this.idToXML(item.id)}
    ${this.stepToXML(item.step)}
    ${this.rawInputToXML(item.rawInput)}
    ${this.commentToXML(item.comment)}
    ${this.dependentOnToXML(item.dependentOn)}
    ${this.formulaToXML(item.formula)}
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

  dependentOnToXML(dependentOn: string[] | undefined): string {
    if (!dependentOn) {
      return `<dependentOn></dependentOn>`;
    } else {
      const ids = dependentOn.map((id) => `<id>${id}</id>`);

      return `<dependentOn>${ids.join('')}</dependentOn>`;
    }
  },

  formulaToXML(formula: PropositionalFormula): string {
    if (Array.isArray(formula.values) && formula.operator !== PropositionalOperator.Var) {
      const nestedFormulas = formula.values.map((value) => this.formulaToXML(value)).join('\n');

      return `<propositionalFormula>
      ${this.operatorToXML(formula.operator)}
      <values>
        ${nestedFormulas}
      </values>
    </propositionalFormula>`;
    } else {
      return `<propositionalFormula>
      ${this.operatorToXML(formula.operator)}
      <values>${formula.values.toString()}</values>
    </propositionalFormula>`;
    }
  },

  operatorToXML(operator: PropositionalOperator): string {
    return `<operator>${operator.toString()}</operator>`;
  },
};

export default Object.freeze(converterXML);

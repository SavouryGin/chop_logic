import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { Language, LocalText, PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { PropositionalOperator } from 'enums';

const converterXML = {
  dpToXML(tableData: DirectProofsTableItem[]): string {
    return `<propositionsDirectProof>${this.dpArrayToXML(tableData)}</propositionsDirectProof>`;
  },

  dpArrayToXML(data: DirectProofsTableItem[]): string {
    const itemsArray = data.map((item) => this.dpItemToXML(item));

    return itemsArray.join('');
  },

  dpItemToXML(item: DirectProofsTableItem): string {
    const xml = `<tableItem>${this.idToXML(item.id)}${this.stepToXML(item.step)}${this.rawInputToXML(item.rawInput)}${this.commentToXML(
      item.comment,
    )}${this.dependentOnToXML(item.dependentOn)}${this.formulaToXML(item.formula)}${this.expressionToXML(
      item.expression,
    )}${this.expressionToXML(item.friendlyExpression)}</tableItem>`;

    console.log(xml);

    return xml;
  },

  npToXML(tableData: NaturalProofsTableItem[]): string {
    return `<propositionsDirectProof>${this.dpArrayToXML(tableData)}</propositionsDirectProof>`;
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
      const nestedFormulas = formula.values.map((value) => this.formulaToXML(value)).join('');

      return `<propositionalFormula>${this.operatorToXML(formula.operator)}<values>${nestedFormulas}</values></propositionalFormula>`;
    } else {
      return `<propositionalFormula>${this.operatorToXML(
        formula.operator,
      )}<values>${formula.values.toString()}</values></propositionalFormula>`;
    }
  },

  operatorToXML(operator: PropositionalOperator): string {
    return `<operator>${operator.toString()}</operator>`;
  },

  expressionToXML(expression: PropositionalExpression): string {
    const symbols = expression.map((symbol) => this.symbolToXML(symbol));

    return `<propositionalExpression>${symbols.join('')}</propositionalExpression>`;
  },

  symbolToXML(symbol: PropositionalSymbol): string {
    return `<propositionalSymbol><input>${symbol.input}</input><type>${symbol.type}</type><position>${
      symbol.position
    }</position><representation>${symbol.representation || ''}</representation></propositionalSymbol>`;
  },
};

export default Object.freeze(converterXML);

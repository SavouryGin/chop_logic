import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { Language, LocalText, PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';
import { NPFormulaBase, PropositionalOperator } from 'enums';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { XMLTag } from 'enums/xml-tags';

const converterXML = {
  dpToXML(tableData: DirectProofsTableItem[]): string {
    return `${XMLTag.Declaration}\n${XMLTag.DPOpen}${this.dpArrayToXML(tableData)}${XMLTag.DPClose}`;
  },

  dpArrayToXML(data: DirectProofsTableItem[]): string {
    const itemsArray = data.map((item) => this.dpItemToXML(item));

    return itemsArray.join('');
  },

  dpItemToXML(item: DirectProofsTableItem): string {
    const xml = `${XMLTag.TItemOpen}${this.idToXML(item.id)}${this.stepToXML(item.step)}${this.rawInputToXML(
      item.rawInput,
    )}${this.commentToXML(item.comment)}${this.dependentOnToXML(item.dependentOn)}${this.formulaToXML(item.formula)}${this.expressionToXML(
      item.expression,
    )}${this.expressionToXML(item.friendlyExpression)}${XMLTag.TItemClose}`;

    return xml;
  },

  npToXML(tableData: NaturalProofsTableItem[]): string {
    return `${XMLTag.Declaration}\n${XMLTag.NPOpen}${this.npArrayToXML(tableData)}${XMLTag.NPClose}`;
  },

  npArrayToXML(data: NaturalProofsTableItem[]): string {
    const itemsArray = data.map((item) => this.npItemToXML(item));

    return itemsArray.join('');
  },

  npItemToXML(item: NaturalProofsTableItem): string {
    const xml = `${XMLTag.TItemOpen}${this.idToXML(item.id)}${this.stepToXML(item.step)}${this.rawInputToXML(
      item.rawInput,
    )}${this.commentToXML(item.comment)}${this.dependentOnToXML(item.dependentOn)}${this.formulaToXML(item.formula)}${this.expressionToXML(
      item.expression,
    )}${this.expressionToXML(item.friendlyExpression)}${this.levelToXML(item.level)}${this.formulaBaseToXML(
      item.formulaBase,
    )}${this.assumptionIdToXML(item.assumptionId)}${XMLTag.TItemClose}`;

    return xml;
  },

  idToXML(id: string): string {
    return `${XMLTag.IdOpen}${id}${XMLTag.IdClose}`;
  },

  stepToXML(step: number): string {
    return `${XMLTag.StepOpen}${step}${XMLTag.StepClose}`;
  },

  levelToXML(level: number): string {
    return `${XMLTag.LevelOpen}${level}${XMLTag.LevelClose}`;
  },

  formulaBaseToXML(base: NPFormulaBase): string {
    return `${XMLTag.FBaseOpen}${base}${XMLTag.FBaseClose}`;
  },

  assumptionIdToXML(id: string | null): string {
    return `${XMLTag.AIDOpen}${id ? id : 'null'}${XMLTag.AIDClose}`;
  },

  rawInputToXML(rawInput: string): string {
    return `${XMLTag.RInputOpen}${rawInput}${XMLTag.RInputClose}`;
  },

  commentToXML(comment: string | LocalText): string {
    if (typeof comment === 'string') {
      return `${XMLTag.CommentOpen}${comment}${XMLTag.CommentClose}`;
    } else {
      const pairs = [];

      for (const lang in comment) {
        const pair = `<${lang}>${comment[lang as Language]}</${lang}>`;
        pairs.push(pair);
      }

      return `${XMLTag.CommentOpen}${pairs.join('')}${XMLTag.CommentClose}`;
    }
  },

  dependentOnToXML(dependentOn: string[] | undefined): string {
    if (!dependentOn) {
      return `${XMLTag.DepOpen}${XMLTag.DepClose}`;
    } else {
      const ids = dependentOn.map((id) => `${XMLTag.IdOpen}${id}${XMLTag.IdClose}`);

      return `${XMLTag.DepOpen}${ids.join('')}${XMLTag.DepClose}`;
    }
  },

  formulaToXML(formula: PropositionalFormula): string {
    if (Array.isArray(formula.values) && formula.operator !== PropositionalOperator.Var) {
      const nestedFormulas = formula.values.map((value) => this.formulaToXML(value)).join('');

      return `${XMLTag.PFormulaOpen}${this.operatorToXML(formula.operator)}${XMLTag.ValuesOpen}${nestedFormulas}${XMLTag.ValuesClose}${
        XMLTag.PFormulaClose
      }`;
    } else {
      return `${XMLTag.PFormulaOpen}${this.operatorToXML(formula.operator)}${XMLTag.ValuesOpen}${formula.values.toString()}${
        XMLTag.ValuesClose
      }${XMLTag.PFormulaClose}`;
    }
  },

  operatorToXML(operator: PropositionalOperator): string {
    return `${XMLTag.OperatorOpen}${operator.toString()}${XMLTag.OperatorClose}`;
  },

  expressionToXML(expression: PropositionalExpression): string {
    const symbols = expression.map((symbol) => this.symbolToXML(symbol));

    return `${XMLTag.PExpressionOpen}${symbols.join('')}${XMLTag.PExpressionClose}`;
  },

  symbolToXML(symbol: PropositionalSymbol): string {
    return `${XMLTag.PSymbolOpen}${XMLTag.InputOpen}${symbol.input}${XMLTag.InputClose}${XMLTag.TypeOpen}${symbol.type}${XMLTag.TypeClose}${
      XMLTag.PositionOpen
    }${symbol.position}${XMLTag.PositionClose}${XMLTag.RepresentOpen}${symbol.representation || ''}${XMLTag.RepresentClose}${
      XMLTag.PSymbolClose
    }`;
  },
};

export default Object.freeze(converterXML);

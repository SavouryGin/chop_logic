import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { Language, LocalText, PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';
import { NPFormulaBase, PropositionalOperator } from 'enums';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { XMLTag } from 'enums/xml-tags';

const idToXML = (id: string): string => {
  return `${XMLTag.IdOpen}${id}${XMLTag.IdClose}`;
};

const stepToXML = (step: number): string => {
  return `${XMLTag.StepOpen}${step}${XMLTag.StepClose}`;
};

const levelToXML = (level: number): string => {
  return `${XMLTag.LevelOpen}${level}${XMLTag.LevelClose}`;
};

const formulaBaseToXML = (base: NPFormulaBase): string => {
  return `${XMLTag.FBaseOpen}${base}${XMLTag.FBaseClose}`;
};

const assumptionIdToXML = (id: string | null): string => {
  return `${XMLTag.AIDOpen}${id ? id : 'null'}${XMLTag.AIDClose}`;
};

const rawInputToXML = (rawInput: string): string => {
  return `${XMLTag.RInputOpen}${rawInput}${XMLTag.RInputClose}`;
};

const commentToXML = (comment: string | LocalText): string => {
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
};

const dependentOnToXML = (dependentOn: string[] | undefined): string => {
  if (!dependentOn) {
    return `${XMLTag.DepOpen}${XMLTag.DepClose}`;
  } else {
    const ids = dependentOn.map((id) => `${XMLTag.IdOpen}${id}${XMLTag.IdClose}`);

    return `${XMLTag.DepOpen}${ids.join('')}${XMLTag.DepClose}`;
  }
};

const formulaToXML = (formula: PropositionalFormula): string => {
  if (Array.isArray(formula.values) && formula.operator !== PropositionalOperator.Var) {
    const nestedFormulas = formula.values.map((value) => formulaToXML(value)).join('');

    return `${XMLTag.PFormulaOpen}${operatorToXML(formula.operator)}${XMLTag.ValuesOpen}${nestedFormulas}${XMLTag.ValuesClose}${
      XMLTag.PFormulaClose
    }`;
  } else {
    return `${XMLTag.PFormulaOpen}${operatorToXML(formula.operator)}${XMLTag.ValuesOpen}${formula.values.toString()}${XMLTag.ValuesClose}${
      XMLTag.PFormulaClose
    }`;
  }
};

const operatorToXML = (operator: PropositionalOperator): string => {
  return `${XMLTag.OperatorOpen}${operator.toString()}${XMLTag.OperatorClose}`;
};

const expressionToXML = (expression: PropositionalExpression): string => {
  const symbols = expression.map((symbol) => symbolToXML(symbol));

  return `${XMLTag.PExpressionOpen}${symbols.join('')}${XMLTag.PExpressionClose}`;
};

const symbolToXML = (symbol: PropositionalSymbol): string => {
  return `${XMLTag.PSymbolOpen}${XMLTag.InputOpen}${symbol.input}${XMLTag.InputClose}${XMLTag.TypeOpen}${symbol.type}${XMLTag.TypeClose}${
    XMLTag.PositionOpen
  }${symbol.position}${XMLTag.PositionClose}${XMLTag.RepresentOpen}${symbol.representation || ''}${XMLTag.RepresentClose}${
    XMLTag.PSymbolClose
  }`;
};

const dpArrayToXML = (data: DirectProofsTableItem[]): string => {
  const itemsArray = data.map((item) => dpItemToXML(item));

  return itemsArray.join('');
};

const dpItemToXML = (item: DirectProofsTableItem): string => {
  const xml = `${XMLTag.TItemOpen}${idToXML(item.id)}${stepToXML(item.step)}${rawInputToXML(item.rawInput)}${commentToXML(
    item.comment,
  )}${dependentOnToXML(item.dependentOn)}${formulaToXML(item.formula)}${expressionToXML(item.expression)}${expressionToXML(
    item.friendlyExpression,
  )}${XMLTag.TItemClose}`;

  return xml;
};

const npArrayToXML = (data: NaturalProofsTableItem[]): string => {
  const itemsArray = data.map((item) => npItemToXML(item));

  return itemsArray.join('');
};

const npItemToXML = (item: NaturalProofsTableItem): string => {
  const xml = `${XMLTag.TItemOpen}${idToXML(item.id)}${stepToXML(item.step)}${rawInputToXML(item.rawInput)}${commentToXML(
    item.comment,
  )}${dependentOnToXML(item.dependentOn)}${formulaToXML(item.formula)}${expressionToXML(item.expression)}${expressionToXML(
    item.friendlyExpression,
  )}${levelToXML(item.level)}${formulaBaseToXML(item.formulaBase)}${assumptionIdToXML(item.assumptionId)}${XMLTag.TItemClose}`;

  return xml;
};

const npToXML = (tableData: NaturalProofsTableItem[]): string => {
  return `${XMLTag.Declaration}\n${XMLTag.NPOpen}${npArrayToXML(tableData)}${XMLTag.NPClose}`;
};

const dpToXML = (tableData: DirectProofsTableItem[]): string => {
  return `${XMLTag.Declaration}\n${XMLTag.DPOpen}${dpArrayToXML(tableData)}${XMLTag.DPClose}`;
};

const converterXML = {
  npToXML,
  dpToXML,
};

export default Object.freeze(converterXML);

import regExes from 'helpers/regular-expressions';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalSymbol, PropositionalSymbolType } from 'types';
import { XMLTag } from 'enums/xml-tags';
import { errorsTexts } from 'texts';

const converterJS = {
  xmlToDPTableData(input: string): DirectProofsTableItem[] {
    const withoutDeclaration = this.removeDeclaration(input).trim();
    console.log('XML input', withoutDeclaration);

    this.getPropositionalExpression(
      '<propositionalExpression><propositionalSymbol><input>(</input><type>parentheses</type><position>0</position><representation>(</representation></propositionalSymbol><propositionalSymbol><input>p</input><type>variable</type><position>1</position><representation>P</representation></propositionalSymbol><propositionalSymbol><input>)</input><type>parentheses</type><position>2</position><representation>)</representation></propositionalSymbol></propositionalExpression>',
    );

    return [];
  },

  removeDeclaration(input: string): string {
    return input.replace(regExes.xmlDeclaration, '');
  },

  getStepValue(input: string): number {
    const value = +input.replace(XMLTag.StepOpen, '').replace(XMLTag.StepClose, '');

    if (isNaN(value)) {
      throw new PropositionalError('Cannot convert the step value from XML tag.', errorsTexts.semanticError);
    }

    return value;
  },

  getRawInput(input: string): string {
    return input.replace(XMLTag.RInputOpen, '').replace(XMLTag.RInputClose, '');
  },

  getId(input: string): string {
    return input.replace(XMLTag.IdOpen, '').replace(XMLTag.IdClose, '');
  },

  getExpressionInput(input: string): string {
    return input.replace(XMLTag.InputOpen, '').replace(XMLTag.InputClose, '');
  },

  getExpressionRepresentation(input: string): string {
    return input.replace(XMLTag.RepresentOpen, '').replace(XMLTag.RepresentClose, '');
  },

  getExpressionType(input: string): string {
    return input.replace(XMLTag.TypeOpen, '').replace(XMLTag.TypeClose, '');
  },

  getExpressionPosition(input: string): number {
    const value = +input.replace(XMLTag.PositionOpen, '').replace(XMLTag.PositionClose, '');

    if (isNaN(value)) {
      throw new PropositionalError('Cannot convert the step value from XML tag.', errorsTexts.semanticError);
    }

    return value;
  },

  getPropositionalSymbol(input: string): PropositionalSymbol {
    const values = input.replace(XMLTag.PSymbolOpen, '').replace(XMLTag.PSymbolClose, '');

    const inputMatch = values.match(new RegExp(XMLTag.InputOpen + '.*' + XMLTag.InputClose, 'i'))![0];
    const representationMatch = values.match(new RegExp(XMLTag.RepresentOpen + '.*' + XMLTag.RepresentClose, 'i'))![0];
    const typeMatch = values.match(new RegExp(XMLTag.TypeOpen + '.*' + XMLTag.TypeClose, 'i'))![0];
    const positionMatch = values.match(new RegExp(XMLTag.PositionOpen + '.*' + XMLTag.PositionClose, 'i'))![0];

    return {
      input: this.getExpressionInput(inputMatch),
      representation: this.getExpressionRepresentation(representationMatch),
      type: this.getExpressionType(typeMatch) as PropositionalSymbolType,
      position: this.getExpressionPosition(positionMatch),
    };
  },

  getPropositionalExpression(input: string): PropositionalExpression {
    const value = input.replace(XMLTag.PExpressionOpen, '').replace(XMLTag.PExpressionClose, '');
    const symbolsStrings = value.split(new RegExp('(?=' + XMLTag.PSymbolOpen + ')', 'g'));
    const result: PropositionalExpression = [];

    for (const item of symbolsStrings) {
      try {
        const symbol = this.getPropositionalSymbol(item);
        result.push(symbol);
      } catch (error: unknown) {
        console.error(error);
        throw new PropositionalError(`Cannot convert the propositional symbol from "${item}"`, errorsTexts.semanticError);
      }
    }

    return result;
  },
};

export default Object.freeze(converterJS);

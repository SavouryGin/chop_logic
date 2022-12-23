import regExes from 'helpers/regular-expressions';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalSymbol } from 'types';
import { XMLTag } from 'enums/xml-tags';
import { errorsTexts } from 'texts';

const converterJS = {
  xmlToDPTableData(input: string): DirectProofsTableItem[] {
    const withoutDeclaration = this.removeDeclaration(input).trim();
    console.log('XML input', withoutDeclaration);

    this.getPropositionalSymbol(
      '<propositionalSymbol><input>p</input><type>variable</type><position>1</position><representation>P</representation></propositionalSymbol>',
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
    const inputRegex = new RegExp(XMLTag.InputOpen + '.*' + XMLTag.InputClose, 'i');
    const reprRegex = new RegExp(XMLTag.RepresentOpen + '.*' + XMLTag.RepresentClose, 'i');
    const typeRegex = new RegExp(XMLTag.TypeOpen + '.*' + XMLTag.TypeClose, 'i');
    const positionRegex = new RegExp(XMLTag.PositionOpen + '.*' + XMLTag.PositionClose, 'i');

    const values = input.replace(XMLTag.PSymbolOpen, '').replace(XMLTag.PSymbolClose, '');
    const inputString = values.match(inputRegex);
    const reprString = values.match(reprRegex);
    const typeString = values.match(typeRegex);
    const positionString = values.match(positionRegex);

    console.log(inputString, reprString, typeString, positionString);

    return {
      input: '',
      representation: '',
      type: 'operator',
      position: 0,
    };
  },
};

export default Object.freeze(converterJS);

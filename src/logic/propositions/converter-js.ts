import converter from './converter';
import regExes from 'helpers/regular-expressions';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { LocalText, PropositionalExpression, PropositionalSymbol, PropositionalSymbolType } from 'types';
import { PropositionalError } from 'errors/propositional-error';
import { XMLTag } from 'enums/xml-tags';
import { errorsTexts } from 'texts';
import { languageStringOptions } from 'presets/settings';

const converterJS = {
  xmlToDPTableData(input: string): DirectProofsTableItem[] {
    const withoutDeclaration = this.removeDeclaration(input).trim();
    const withoutDPTag = withoutDeclaration.replace(XMLTag.DPOpen, '').replace(XMLTag.DPClose, '');

    const tableItems = withoutDPTag.split(new RegExp('(?=' + XMLTag.TItemOpen + ')', 'g'));

    return tableItems.map((item) => this.parseDPTableItem(item));
  },

  parseDPTableItem(input: string): DirectProofsTableItem {
    const value = input.replace(XMLTag.TItemOpen, '').replace(XMLTag.TItemClose, '');

    try {
      const idMatch = value.match(new RegExp(XMLTag.IdOpen + '.*' + XMLTag.IdClose, 'i'))![0];
      const stepMatch = value.match(new RegExp(XMLTag.StepOpen + '.*' + XMLTag.StepClose, 'i'))![0];
      const rawInputMatch = value.match(new RegExp(XMLTag.RInputOpen + '.*' + XMLTag.RInputClose, 'i'))![0];
      const expressionMatch = value.match(new RegExp(XMLTag.PExpressionOpen + '.*' + XMLTag.PExpressionClose, 'i'))![0];
      const commentMatch = value.match(new RegExp(XMLTag.CommentOpen + '.*' + XMLTag.CommentClose, 'i'))![0];

      const id = this.parseId(idMatch);
      const step = this.parseStep(stepMatch);
      const rawInput = this.parseRawInput(rawInputMatch);
      const expression = this.parsePropositionalExpression(expressionMatch);
      const comment = this.parseComment(commentMatch);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);

      return {
        id,
        step,
        rawInput,
        expression,
        comment,
        formula,
        friendlyExpression,
      };
    } catch (error: unknown) {
      console.error(error);
      throw new PropositionalError('Cannot convert the table item from XML.', errorsTexts.semanticError);
    }
  },

  removeDeclaration(input: string): string {
    return input.replace(regExes.xmlDeclaration, '');
  },

  parseStep(input: string): number {
    const value = +input.replace(XMLTag.StepOpen, '').replace(XMLTag.StepClose, '');

    if (isNaN(value)) {
      throw new PropositionalError('Cannot convert the step value from XML tag.', errorsTexts.semanticError);
    }

    return value;
  },

  parseRawInput(input: string): string {
    return input.replace(XMLTag.RInputOpen, '').replace(XMLTag.RInputClose, '');
  },

  parseId(input: string): string {
    return input.replace(XMLTag.IdOpen, '').replace(XMLTag.IdClose, '');
  },

  parseExpressionInput(input: string): string {
    return input.replace(XMLTag.InputOpen, '').replace(XMLTag.InputClose, '');
  },

  parseExpressionRepresentation(input: string): string {
    return input.replace(XMLTag.RepresentOpen, '').replace(XMLTag.RepresentClose, '');
  },

  parseExpressionType(input: string): string {
    return input.replace(XMLTag.TypeOpen, '').replace(XMLTag.TypeClose, '');
  },

  parseExpressionPosition(input: string): number {
    const value = +input.replace(XMLTag.PositionOpen, '').replace(XMLTag.PositionClose, '');

    if (isNaN(value)) {
      throw new PropositionalError('Cannot convert the step value from XML tag.', errorsTexts.semanticError);
    }

    return value;
  },

  parsePropositionalSymbol(input: string): PropositionalSymbol {
    const values = input.replace(XMLTag.PSymbolOpen, '').replace(XMLTag.PSymbolClose, '');

    const inputMatch = values.match(new RegExp(XMLTag.InputOpen + '.*' + XMLTag.InputClose, 'i'))![0];
    const representationMatch = values.match(new RegExp(XMLTag.RepresentOpen + '.*' + XMLTag.RepresentClose, 'i'))![0];
    const typeMatch = values.match(new RegExp(XMLTag.TypeOpen + '.*' + XMLTag.TypeClose, 'i'))![0];
    const positionMatch = values.match(new RegExp(XMLTag.PositionOpen + '.*' + XMLTag.PositionClose, 'i'))![0];

    return {
      input: this.parseExpressionInput(inputMatch),
      representation: this.parseExpressionRepresentation(representationMatch),
      type: this.parseExpressionType(typeMatch) as PropositionalSymbolType,
      position: this.parseExpressionPosition(positionMatch),
    };
  },

  parsePropositionalExpression(input: string): PropositionalExpression {
    const value = input.replace(XMLTag.PExpressionOpen, '').replace(XMLTag.PExpressionClose, '');
    const symbolsStrings = value.split(new RegExp('(?=' + XMLTag.PSymbolOpen + ')', 'g'));
    const result: PropositionalExpression = [];

    for (const item of symbolsStrings) {
      try {
        const symbol = this.parsePropositionalSymbol(item);
        result.push(symbol);
      } catch (error: unknown) {
        console.error(error);
        throw new PropositionalError(`Cannot convert the propositional symbol from "${item}"`, errorsTexts.semanticError);
      }
    }

    return result;
  },

  parseComment(input: string): LocalText | string {
    const value = input.replace(XMLTag.CommentOpen, '').replace(XMLTag.CommentClose, '');
    const localTextResult: any = {};

    for (const lang of languageStringOptions) {
      // Check if value is a simple string
      if (value.indexOf(lang) === -1) {
        return value;
      } else {
        // Extract the local comment text
        const localComment = value.match(new RegExp(`<${lang}>` + '.*' + `</${lang}>`, 'i'))![0];
        const text = localComment.replace(`<${lang}>`, '').replace(`</${lang}>`, '');

        localTextResult[lang] = text;
      }
    }

    return localTextResult as LocalText;
  },
};

export default Object.freeze(converterJS);

import converter from './converter';
import regExes from 'helpers/regular-expressions';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { LocalText, PropositionalExpression, PropositionalSymbol, PropositionalSymbolType } from 'types';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalOperator } from 'enums';
import { XMLTag } from 'enums/xml-tags';
import { errorsTexts } from 'texts';
import { languageStringOptions } from 'presets/settings';

const converterJS = {
  xmlToDPTableData(input: string): DirectProofsTableItem[] {
    const withoutDeclaration = this.removeDeclaration(input).trim();
    console.log('XML input', withoutDeclaration);

    const item = this.getDPTableItem(
      '<tableItem><id>9565237b-f652-4ed2-2ac4-5b14b6acb84d</id><step>1</step><rawInput>p</rawInput><comment><en>Premise</en><ru>Посылка</ru></comment><dependentOn></dependentOn><propositionalFormula><operator>VAR</operator><values>P</values></propositionalFormula><propositionalExpression><propositionalSymbol><input>(</input><type>parentheses</type><position>0</position><representation>(</representation></propositionalSymbol><propositionalSymbol><input>p</input><type>variable</type><position>1</position><representation>P</representation></propositionalSymbol><propositionalSymbol><input>)</input><type>parentheses</type><position>2</position><representation>)</representation></propositionalSymbol></propositionalExpression><propositionalExpression><propositionalSymbol><input>P</input><type>variable</type><position>0</position><representation>P</representation></propositionalSymbol></propositionalExpression></tableItem>',
    );

    console.log('item', item);

    return [];
  },

  getDPTableItem(input: string): DirectProofsTableItem {
    const value = input.replace(XMLTag.TItemOpen, '').replace(XMLTag.TItemClose, '');

    try {
      const idMatch = value.match(new RegExp(XMLTag.IdOpen + '.*' + XMLTag.IdClose, 'i'))![0];
      const stepMatch = value.match(new RegExp(XMLTag.StepOpen + '.*' + XMLTag.StepClose, 'i'))![0];
      const rawInputMatch = value.match(new RegExp(XMLTag.RInputOpen + '.*' + XMLTag.RInputClose, 'i'))![0];
      const expressionMatch = value.match(new RegExp(XMLTag.PExpressionOpen + '.*' + XMLTag.PExpressionClose, 'i'))![0];
      const commentMatch = value.match(new RegExp(XMLTag.CommentOpen + '.*' + XMLTag.CommentClose, 'i'))![0];

      const id = this.getId(idMatch);
      const step = this.getStep(stepMatch);
      const rawInput = this.getRawInput(rawInputMatch);
      const expression = this.getPropositionalExpression(expressionMatch);
      const comment = this.getComment(commentMatch);
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

  getStep(input: string): number {
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
    console.log('symbolsStrings', symbolsStrings);
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

  getComment(input: string): LocalText | string {
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

  getOperator(input: string): PropositionalOperator {
    const value = input.replace(XMLTag.OperatorOpen, '').replace(XMLTag.OperatorClose, '');

    return value as PropositionalOperator;
  },

  getFormulaVariable(input: string): string {
    const value = input.replace(XMLTag.ValuesOpen, '').replace(XMLTag.ValuesClose, '');

    return value;
  },
};

export default Object.freeze(converterJS);

import regExes from 'helpers/regular-expressions';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { LocalText, PropositionalExpression, PropositionalFormula, PropositionalSymbol, PropositionalSymbolType } from 'types';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalOperator } from 'enums';
import { XMLTag } from 'enums/xml-tags';
import { errorsTexts } from 'texts';
import { languageStringOptions } from 'presets/settings';

const converterJS = {
  xmlToDPTableData(input: string): DirectProofsTableItem[] {
    const withoutDeclaration = this.removeDeclaration(input).trim();
    console.log('XML input', withoutDeclaration);

    const result = this.getPropositionalFormula(
      '<propositionalFormula><operator>IMPLIES</operator><values><propositionalFormula><operator>IMPLIES</operator><values><propositionalFormula><operator>VAR</operator><values>D</values></propositionalFormula><propositionalFormula><operator>IMPLIES</operator><values><propositionalFormula><operator>VAR</operator><values>S</values></propositionalFormula><propositionalFormula><operator>VAR</operator><values>A</values></propositionalFormula></values></propositionalFormula></values></propositionalFormula><propositionalFormula><operator>IMPLIES</operator><values><propositionalFormula><operator>IMPLIES</operator><values><propositionalFormula><operator>VAR</operator><values>D</values></propositionalFormula><propositionalFormula><operator>VAR</operator><values>S</values></propositionalFormula></values></propositionalFormula><propositionalFormula><operator>IMPLIES</operator><values><propositionalFormula><operator>VAR</operator><values>D</values></propositionalFormula><propositionalFormula><operator>VAR</operator><values>A</values></propositionalFormula></values></propositionalFormula></values></propositionalFormula></values></propositionalFormula>',
    );
    console.log('Result', result);

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

  getPropositionalFormula(input: string): PropositionalFormula {
    const rawString = input.replace(XMLTag.PFormulaOpen, '').replace(new RegExp(XMLTag.PFormulaClose + '$'), '');
    console.log('rawString', rawString);

    const operatorMatch = rawString.match(new RegExp(XMLTag.OperatorOpen + '[A-Z]' + XMLTag.OperatorClose, 'g'));
    const valuesMatch = rawString.match(new RegExp(XMLTag.ValuesOpen + '.*' + XMLTag.ValuesClose, 'i'));

    console.log('operatorMatch', operatorMatch);
    console.log('valuesMatch', valuesMatch);
    // const operator = this.getOperator(operatorMatch);

    // if (operator === PropositionalOperator.Var) {
    //   const variable = this.getFormulaVariable(valuesMatch);

    //   return {
    //     operator,
    //     values: variable,
    //   };
    // }

    // const subFormulas = this.getFormulaValues(valuesMatch);

    // console.log('subFormulas', subFormulas);

    return {
      operator: 'VAR' as PropositionalOperator,
      values: '999',
    };
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

  getFormulaValues(input: string): string[] {
    const values = input.replace(XMLTag.ValuesOpen, '').replace(new RegExp(XMLTag.ValuesClose + '$'), '');
    console.log('getFormulaValues', values);

    const splittedValues = values.split(new RegExp('(?=' + XMLTag.PFormulaOpen + ')', 'g'));

    return splittedValues;
  },
};

export default Object.freeze(converterJS);

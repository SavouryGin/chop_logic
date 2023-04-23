import converter from 'logic/propositions/converter';
import errorsTexts from 'texts/propositions/elements';
import truthTableGenerator from 'logic/propositions/truth-table-generator';
import { PropositionalExpression, PropositionalFormula, TableItem } from 'types';
import { SagaIterator } from 'redux-saga';
import { TruthTableColumn } from '../interfaces';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { call, put, takeEvery } from 'redux-saga/effects';

export function* generateTruthTableWatcher(): Generator {
  yield takeEvery(actions.generateTruthTable, generateTruthTableSaga);
}

export function* generateTruthTableSaga(action: { payload: { input: string } }): SagaIterator {
  try {
    const { input } = action.payload;
    const expression: PropositionalExpression = yield call(converter.convertStringToExpression, input);
    const formula: PropositionalFormula = yield call(converter.convertExpressionToFormula, expression);
    const columns: TruthTableColumn[] = yield call(truthTableGenerator.generateColumnsFromFormula, formula);
    const data: TableItem[] = yield call(truthTableGenerator.calculateTableData, { formula, columns });
    yield put(actions.setTableColumns(columns));
    yield put(actions.setTableData(data));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

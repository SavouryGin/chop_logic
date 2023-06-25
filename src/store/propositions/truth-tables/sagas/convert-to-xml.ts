import converter from 'logic/propositions/converter';
import converterXML from 'logic/propositions/converter-xml';
import errorsTexts from 'texts/propositions/elements';
import selectors from '../selectors';
import { PropositionalExpression, PropositionalFormula, TableItem } from 'types';
import { SagaIterator } from 'redux-saga';
import { TruthTableColumn } from '../interfaces';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export function* exportTruthTableToXMLWatcher(): Generator {
  yield takeEvery(actions.exportXML, exportTruthTableToXMLSaga);
}

export function* exportTruthTableToXMLSaga(action: { payload: { input: string } }): SagaIterator {
  try {
    const { input } = action.payload;
    const expression: PropositionalExpression = yield call(converter.convertStringToExpression, input);
    const formula: PropositionalFormula = yield call(converter.convertExpressionToFormula, expression);
    const columns: TruthTableColumn[] = yield select(selectors.columns);
    const data: TableItem[] = yield select(selectors.data);
    yield call(converterXML.truthTableToXML, { columns, data, formula });
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

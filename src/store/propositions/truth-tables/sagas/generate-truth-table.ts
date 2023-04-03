import converter from 'logic/propositions/converter';
import errorsTexts from 'texts/propositions/elements';
import { PropositionalExpression, PropositionalFormula } from 'types';
import { SagaIterator } from 'redux-saga';
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

    console.log('Saga', formula);
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

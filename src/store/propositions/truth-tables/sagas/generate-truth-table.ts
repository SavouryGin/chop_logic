import errorsTexts from 'texts/propositions/elements';
import { SagaIterator } from 'redux-saga';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { put, takeEvery } from 'redux-saga/effects';

export function* generateTruthTableWatcher(): Generator {
  yield takeEvery(actions.generateTruthTable, generateTruthTableSaga);
}

export function* generateTruthTableSaga(action: { payload: { input: string } }): SagaIterator {
  try {
    const { input } = action.payload;
    console.log('Saga', input);
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

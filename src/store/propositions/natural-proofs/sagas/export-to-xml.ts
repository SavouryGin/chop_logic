import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { put, takeEvery } from 'redux-saga/effects';

export function* exportNPToXMLWatcher(): Generator {
  yield takeEvery(actions.exportToXML, exportNPToXMLSaga);
}

export function* exportNPToXMLSaga(): SagaIterator {
  try {
    console.log('Export Saga');

    yield put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }));
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Export to XML error';
    yield put(actions.setError(errorMessage));
  }
}

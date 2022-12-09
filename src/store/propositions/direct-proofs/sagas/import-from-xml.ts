import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { put, takeEvery } from 'redux-saga/effects';

export function* importDPFromXMLWatcher(): Generator {
  yield takeEvery(actions.importFromXML, importDPFromXMLSaga);
}

export function* importDPFromXMLSaga(): SagaIterator {
  try {
    console.log('IMPORT Saga');
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Import to XML error';
    yield put(actions.setError(errorMessage));
  }
}

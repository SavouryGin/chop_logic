import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { readUserTextFile } from 'helpers/files/read-user-text-file';

export function* importDPFromXMLWatcher(): Generator {
  yield takeEvery(actions.importFromXML, importDPFromXMLSaga);
}

export function* importDPFromXMLSaga(action: { payload: { file: File } }): SagaIterator {
  try {
    console.log('IMPORT DP Saga');
    const { file } = action.payload;

    const text = yield call(readUserTextFile, file);

    console.log('Text', text);
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Import from XML file error';
    yield put(actions.setError(errorMessage));
  }
}
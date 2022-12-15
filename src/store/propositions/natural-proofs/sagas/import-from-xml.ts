import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { readUserTextFile } from 'helpers/files/read-user-text-file';

export function* importNPFromXMLWatcher(): Generator {
  yield takeEvery(actions.importFromXML, importNPFromXMLSaga);
}

export function* importNPFromXMLSaga(action: { payload: { file: File } }): SagaIterator {
  try {
    console.log('IMPORT NP Saga');
    const { file } = action.payload;

    const text = yield call(readUserTextFile, file);

    console.log('Text', text);
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Import from XML file error';
    yield put(actions.setError(errorMessage));
  }
}

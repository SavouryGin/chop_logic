import converterJS from 'logic/propositions/converter-js';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { readUserTextFile } from 'helpers/files/read-user-text-file';

export function* importDPFromXMLWatcher(): Generator {
  yield takeEvery(actions.importFromXML, importDPFromXMLSaga);
}

export function* importDPFromXMLSaga(action: { payload: { file: File } }): SagaIterator {
  yield put(actions.setUpFlag({ flag: 'isLoading', value: true }));
  try {
    const { file } = action.payload;
    const text: string = yield call(readUserTextFile, file);
    const tableData = converterJS.xmlToDPTableData(text);

    yield put(actions.setTableData(tableData));

    yield put(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: false }));
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Import from XML file error';
    yield put(actions.setError(errorMessage));
  } finally {
    yield put(actions.setUpFlag({ flag: 'isLoading', value: false }));
  }
}

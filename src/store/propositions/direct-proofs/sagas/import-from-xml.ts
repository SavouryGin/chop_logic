import parser from 'logic/propositions/parser-xml-to-js';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs';
import { call, put, takeEvery } from 'redux-saga/effects';
import { errorsTexts } from 'texts';
import { readUserTextFile } from 'helpers/files/read-user-text-file';

export function* importDPFromXMLWatcher(): Generator {
  yield takeEvery(actions.importFromXML, importDPFromXMLSaga);
}

export function* importDPFromXMLSaga(action: { payload: { file: File } }): SagaIterator {
  yield put(actions.setUpFlag({ flag: 'isLoading', value: true }));
  try {
    const { file } = action.payload;
    const text: string = yield call(readUserTextFile, file);
    const tableData = yield call(parser.xmlToDPTableData, text);

    yield put(actions.setTableData(tableData));

    yield put(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: false }));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.importError));
  } finally {
    yield put(actions.setUpFlag({ flag: 'isLoading', value: false }));
  }
}

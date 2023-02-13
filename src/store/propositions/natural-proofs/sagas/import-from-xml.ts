import parser from 'logic/propositions/parser-xml-to-js';
import propositionsElementsTexts from 'texts/propositions/elements';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { call, put, takeEvery } from 'redux-saga/effects';
import { readUserTextFile } from 'helpers/files/read-user-text-file';

export function* importNPFromXMLWatcher(): Generator {
  yield takeEvery(actions.importFromXML, importNPFromXMLSaga);
}

export function* importNPFromXMLSaga(action: { payload: { file: File } }): SagaIterator {
  yield put(actions.setUpFlag({ flag: 'isLoading', value: true }));
  try {
    const { file } = action.payload;
    const text = yield call(readUserTextFile, file);
    const tableData = yield call(parser.xmlToNPTableData, text);

    yield put(actions.setTableData(tableData));
    yield put(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: false }));
  } catch (error: unknown) {
    yield put(actions.setError(propositionsElementsTexts.importError));
  } finally {
    yield put(actions.setUpFlag({ flag: 'isLoading', value: false }));
  }
}

import converterXML from 'logic/propositions/converter-xml';
import propositionsTexts from 'assets/texts/propositions/elements';
import { DirectProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { createAndSaveXMLFile } from 'utils/files/create-and-save-xml-file';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* exportDPToXMLWatcher(): Generator {
  yield takeEvery(actions.exportToXML, exportDPToXMLSaga);
}

export function* exportDPToXMLSaga(action: { payload: string | undefined }): SagaIterator {
  try {
    const fileName = action.payload;

    if (!fileName) {
      yield put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }));

      return;
    }

    const tableData: DirectProofsTableItem[] = yield select(selectors.tableData);
    const fileData = converterXML.dpToXML(tableData);

    yield call(createAndSaveXMLFile, fileData, fileName);
  } catch (error: unknown) {
    yield put(actions.setError(propositionsTexts.generalError));
  }
}

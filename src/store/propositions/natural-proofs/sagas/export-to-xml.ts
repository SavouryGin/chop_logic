import converterXML from 'logic/propositions/converter-xml';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { createAndSaveXMLFile } from 'helpers/files/create-and-save-xml-file';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* exportNPToXMLWatcher(): Generator {
  yield takeEvery(actions.exportToXML, exportNPToXMLSaga);
}

export function* exportNPToXMLSaga(action: { payload: string | undefined }): SagaIterator {
  try {
    const fileName = action.payload;

    if (!fileName) {
      yield put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }));

      return;
    }

    const tableData: NaturalProofsTableItem[] = yield select(selectors.getTableData);
    const fileData = converterXML.npToXML(tableData);

    createAndSaveXMLFile(fileData, fileName);
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Export to XML error';
    yield put(actions.setError(errorMessage));
  }
}

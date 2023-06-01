import converterXML from 'logic/propositions/converter-xml';
import errorsTexts from 'texts/propositions/elements';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { createAndSaveXMLFile } from 'helpers/files/create-and-save-xml-file';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

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

    const tableData: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const fileData = converterXML.npToXML(tableData);

    yield call(createAndSaveXMLFile, fileData, fileName);
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

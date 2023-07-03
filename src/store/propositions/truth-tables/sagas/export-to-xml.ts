import converterXML from 'logic/propositions/converter-xml';
import errorsTexts from 'texts/propositions/elements';
import selectors from '../selectors';
import { PropositionalFormula, TableItem } from 'types';
import { SagaIterator } from 'redux-saga';
import { TruthTableColumn } from '../interfaces';
import { ttActions as actions } from 'store/propositions/truth-tables';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { createAndSaveXMLFile } from 'utils/files/create-and-save-xml-file';

export function* exportTruthTableToXMLWatcher(): Generator {
  yield takeEvery(actions.exportToXML, exportTruthTableToXMLSaga);
}

export function* exportTruthTableToXMLSaga(action: { payload: string | undefined }): SagaIterator {
  try {
    const fileName = action.payload;

    if (!fileName) {
      yield put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }));

      return;
    }

    const formula: PropositionalFormula = yield select(selectors.formula);
    const columns: TruthTableColumn[] = yield select(selectors.columns);
    const data: TableItem[] = yield select(selectors.data);
    const fileData = yield call(converterXML.truthTableToXML, { columns, data, formula });

    yield call(createAndSaveXMLFile, fileData, 'truth-table');
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

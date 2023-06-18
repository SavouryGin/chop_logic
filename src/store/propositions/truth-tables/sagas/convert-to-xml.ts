import converterXML from 'logic/propositions/converter-xml';
import errorsTexts from 'texts/propositions/elements';
import selectors from '../selectors';
import { SagaIterator } from 'redux-saga';
import { TableItem } from 'types';
import { TruthTableColumn } from '../interfaces';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export function* exportTruthTableToXMLWatcher(): Generator {
  yield takeEvery(actions.exportXML, exportTruthTableToXMLSaga);
}

export function* exportTruthTableToXMLSaga(): SagaIterator {
  try {
    console.log('SAGA');
    const columns: TruthTableColumn[] = yield select(selectors.columns);
    const data: TableItem[] = yield select(selectors.data);
    yield call(converterXML.truthTableToXML, { columns, data });
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

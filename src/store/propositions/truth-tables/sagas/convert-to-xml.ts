import converterXML from 'logic/propositions/converter-xml';
import errorsTexts from 'texts/propositions/elements';
import selectors from '../selectors';
import { SagaIterator } from 'redux-saga';
import { TableItem } from 'types';
import { TruthTableColumn } from '../interfaces';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export function* convertTruthTableToXMLWatcher(): Generator {
  yield takeEvery(actions.convertToXML, convertTruthTableToXMLSaga);
}

export function* convertTruthTableToXMLSaga(): SagaIterator {
  try {
    const columns: TruthTableColumn[] = yield select(selectors.columns);
    const data: TableItem[] = yield select(selectors.data);
    yield call(converterXML.truthTableToXML, { columns, data });
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

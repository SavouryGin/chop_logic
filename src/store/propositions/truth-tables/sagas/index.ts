import { all } from 'redux-saga/effects';
import { exportTruthTableToXMLWatcher } from 'store/propositions/truth-tables/sagas/export-to-xml';
import { generateTruthTableWatcher } from './generate-truth-table';

function* truthTableSagas(): Generator {
  yield all([generateTruthTableWatcher(), exportTruthTableToXMLWatcher()]);
}

export default truthTableSagas;

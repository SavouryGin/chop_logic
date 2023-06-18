import { all } from 'redux-saga/effects';
import { exportTruthTableToXMLWatcher } from './convert-to-xml';
import { generateTruthTableWatcher } from './generate-truth-table';

function* truthTableSagas(): Generator {
  yield all([generateTruthTableWatcher(), exportTruthTableToXMLWatcher()]);
}

export default truthTableSagas;

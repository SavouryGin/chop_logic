import { all } from 'redux-saga/effects';
import { generateTruthTableWatcher } from './generate-truth-table';

function* truthTableSagas(): Generator {
  yield all([generateTruthTableWatcher()]);
}

export default truthTableSagas;

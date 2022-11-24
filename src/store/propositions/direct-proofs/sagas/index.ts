import { all } from 'redux-saga/effects';
import { deleteDirectProofStepsWatcher } from './delete-steps';
import { exportDPToXMLWatcher } from './export-to-xml';

function* propositionsDPSagas(): Generator {
  yield all([deleteDirectProofStepsWatcher(), exportDPToXMLWatcher()]);
}

export default propositionsDPSagas;

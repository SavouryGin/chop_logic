import { all } from 'redux-saga/effects';
import { deleteDirectProofStepsWatcher } from './delete-steps';
import { exportDPToXMLWatcher } from './export-to-xml';
import { importDPFromXMLWatcher } from './import-from-xml';

function* propositionsDPSagas(): Generator {
  yield all([deleteDirectProofStepsWatcher(), exportDPToXMLWatcher(), importDPFromXMLWatcher()]);
}

export default propositionsDPSagas;

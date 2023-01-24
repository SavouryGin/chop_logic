import { all } from 'redux-saga/effects';
import { cutSubProofDPWatcher } from './cut-sub-proof';
import { deleteDirectProofStepsWatcher } from './delete-steps';
import { exportDPToXMLWatcher } from './export-to-xml';
import { importDPFromXMLWatcher } from './import-from-xml';
import { pasteSubProofDPWatcher } from './paste-sub-proof';

function* propositionsDPSagas(): Generator {
  yield all([
    deleteDirectProofStepsWatcher(),
    exportDPToXMLWatcher(),
    importDPFromXMLWatcher(),
    cutSubProofDPWatcher(),
    pasteSubProofDPWatcher(),
  ]);
}

export default propositionsDPSagas;

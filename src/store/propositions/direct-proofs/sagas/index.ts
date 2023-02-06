import { all } from 'redux-saga/effects';
import { cutStepsDPWatcher } from './cut-steps';
import { deleteDirectProofStepsWatcher } from './delete-steps';
import { exportDPToXMLWatcher } from './export-to-xml';
import { importDPFromXMLWatcher } from './import-from-xml';
import { pasteStepsDPWatcher } from './paste-steps';

function* propositionsDPSagas(): Generator {
  yield all([
    deleteDirectProofStepsWatcher(),
    exportDPToXMLWatcher(),
    importDPFromXMLWatcher(),
    cutStepsDPWatcher(),
    pasteStepsDPWatcher(),
  ]);
}

export default propositionsDPSagas;

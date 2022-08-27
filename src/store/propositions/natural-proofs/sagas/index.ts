import { all } from 'redux-saga/effects';
import { deleteNaturalProofStepsWatcher } from './delete-steps';

function* propositionsNPSagas(): Generator {
  yield all([deleteNaturalProofStepsWatcher()]);
}

export default propositionsNPSagas;

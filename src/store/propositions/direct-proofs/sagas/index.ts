import { all } from 'redux-saga/effects';
import { deleteDirectProofStepsWatcher } from './delete-steps';

function* propositionsDPSagas(): Generator {
  yield all([deleteDirectProofStepsWatcher()]);
}

export default propositionsDPSagas;

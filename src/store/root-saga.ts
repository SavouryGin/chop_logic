import { all } from 'redux-saga/effects';
import { deleteNaturalProofsStepsWatcher } from './propositions/natural-proofs/sagas/delete-steps';

function* rootSaga(): Generator {
  yield all([deleteNaturalProofsStepsWatcher()]);
}

export default rootSaga;

import { all } from 'redux-saga/effects';
import { deleteNaturalProofStepsWatcher } from './delete-steps';
import { disjunctionIntroductionWatcher } from './disjunction-introduction';

function* propositionsNPSagas(): Generator {
  yield all([deleteNaturalProofStepsWatcher(), disjunctionIntroductionWatcher()]);
}

export default propositionsNPSagas;

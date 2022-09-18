import { all } from 'redux-saga/effects';
import { conjunctionIntroductionWatcher } from './conjunction-introduction';
import { deleteNaturalProofStepsWatcher } from './delete-steps';
import { disjunctionEliminationWatcher } from './disjunction-elimination';
import { disjunctionIntroductionWatcher } from './disjunction-introduction';

function* propositionsNPSagas(): Generator {
  yield all([
    deleteNaturalProofStepsWatcher(),
    disjunctionIntroductionWatcher(),
    disjunctionEliminationWatcher(),
    conjunctionIntroductionWatcher(),
  ]);
}

export default propositionsNPSagas;

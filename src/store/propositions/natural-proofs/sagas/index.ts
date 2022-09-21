import { all } from 'redux-saga/effects';
import { conjunctionEliminationWatcher } from './conjunction-elimination';
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
    conjunctionEliminationWatcher(),
  ]);
}

export default propositionsNPSagas;

import { all } from 'redux-saga/effects';
import { conjunctionEliminationWatcher } from './conjunction-elimination';
import { conjunctionIntroductionWatcher } from './conjunction-introduction';
import { cutStepsNPWatcher } from './cut-steps';
import { deleteNaturalProofStepsWatcher } from './delete-steps';
import { disjunctionEliminationWatcher } from './disjunction-elimination';
import { disjunctionIntroductionWatcher } from './disjunction-introduction';
import { equivalenceEliminationWatcher } from './equivalence-elimination';
import { equivalenceIntroductionWatcher } from './equivalence-introduction';
import { exportNPToXMLWatcher } from './export-to-xml';
import { implicationEliminationWatcher } from './implication-elimination';
import { implicationIntroductionWatcher } from './implication-introduction';
import { importNPFromXMLWatcher } from './import-from-xml';
import { negationEliminationWatcher } from './negation-elimination';
import { negationIntroductionWatcher } from './negation-introduction';
import { pasteStepsNPWatcher } from './paste-steps';

function* propositionsNPSagas(): Generator {
  yield all([
    deleteNaturalProofStepsWatcher(),
    disjunctionIntroductionWatcher(),
    disjunctionEliminationWatcher(),
    conjunctionIntroductionWatcher(),
    conjunctionEliminationWatcher(),
    negationIntroductionWatcher(),
    negationEliminationWatcher(),
    equivalenceIntroductionWatcher(),
    equivalenceEliminationWatcher(),
    implicationEliminationWatcher(),
    implicationIntroductionWatcher(),
    exportNPToXMLWatcher(),
    importNPFromXMLWatcher(),
    cutStepsNPWatcher(),
    pasteStepsNPWatcher(),
  ]);
}

export default propositionsNPSagas;

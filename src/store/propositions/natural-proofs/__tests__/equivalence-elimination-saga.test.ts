import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { equivalenceEliminationSaga, equivalenceEliminationWatcher } from '../sagas/equivalence-elimination';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP equivalenceEliminationSaga tests', () => {
  it('equivalenceEliminationWatcher() should call the saga on action', () => {
    testSaga(equivalenceEliminationWatcher).next().takeEvery(actions.eliminateEquivalence, equivalenceEliminationSaga).next().isDone();
  });

  it('equivalenceEliminationSaga() should catch the error', () => {
    testSaga(equivalenceEliminationSaga)
      .next()
      .select(selectors.getSelectedTableItems)
      .next([])
      .select(selectors.getTableData)
      .next([])
      .select(selectors.getTableDataLength)
      .next(0)
      .select(selectors.getLastTableItemLevel)
      .next(0)
      .throw(mocks.error)
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

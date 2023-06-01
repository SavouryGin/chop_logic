import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { conjunctionEliminationSaga, conjunctionEliminationWatcher } from '../sagas/conjunction-elimination';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP conjunctionEliminationSaga tests', () => {
  it('conjunctionEliminationWatcher() should call the saga on action', () => {
    testSaga(conjunctionEliminationWatcher).next().takeEvery(actions.eliminateConjunction, conjunctionEliminationSaga).next().isDone();
  });

  it('conjunctionEliminationSaga() should catch the error', () => {
    testSaga(conjunctionEliminationSaga)
      .next()
      .select(selectors.selectedTableItems)
      .next([])
      .select(selectors.tableData)
      .next([])
      .select(selectors.tableDataLength)
      .next(0)
      .select(selectors.lastTableItemLevel)
      .next(0)
      .select(selectors.lastItemAssumptionId)
      .next(null)
      .throw(mocks.error)
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

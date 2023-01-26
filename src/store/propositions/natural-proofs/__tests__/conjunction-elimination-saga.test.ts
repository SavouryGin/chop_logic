import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { conjunctionEliminationSaga, conjunctionEliminationWatcher } from '../sagas/conjunction-elimination';
import { errorsTexts } from 'texts';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP conjunctionEliminationSaga tests', () => {
  it('conjunctionEliminationWatcher() should call the saga on action', () => {
    testSaga(conjunctionEliminationWatcher).next().takeEvery(actions.eliminateConjunction, conjunctionEliminationSaga).next().isDone();
  });

  it('conjunctionEliminationSaga() should catch the error', () => {
    testSaga(conjunctionEliminationSaga)
      .next()
      .select(selectors.getSelectedTableItems)
      .next([])
      .select(selectors.getTableData)
      .next([])
      .select(selectors.getTableDataLength)
      .next(0)
      .select(selectors.getLastTableItemLevel)
      .next(0)
      .select(selectors.getLastItemAssumptionId)
      .next(null)
      .throw(mocks.error)
      .put(actions.setError(errorsTexts.generalError))
      .next()
      .isDone();
  });
});

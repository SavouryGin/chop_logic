import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'utils/texts/propositions/elements';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { disjunctionEliminationSaga, disjunctionEliminationWatcher } from '../sagas/disjunction-elimination';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP disjunctionEliminationSaga tests', () => {
  it('disjunctionEliminationWatcher() should call the saga on action', () => {
    testSaga(disjunctionEliminationWatcher).next().takeEvery(actions.eliminateDisjunction, disjunctionEliminationSaga).next().isDone();
  });

  it('disjunctionEliminationSaga() should catch the error', () => {
    testSaga(disjunctionEliminationSaga)
      .next()
      .select(selectors.selectedTableItems)
      .next([])
      .select(selectors.tableData)
      .next([])
      .select(selectors.tableDataLength)
      .next(0)
      .select(selectors.lastTableItemLevel)
      .next(0)
      .throw(mocks.error)
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

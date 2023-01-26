import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { disjunctionEliminationSaga, disjunctionEliminationWatcher } from '../sagas/disjunction-elimination';
import { errorsTexts } from 'texts';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP disjunctionEliminationSaga tests', () => {
  it('disjunctionEliminationWatcher() should call the saga on action', () => {
    testSaga(disjunctionEliminationWatcher).next().takeEvery(actions.eliminateDisjunction, disjunctionEliminationSaga).next().isDone();
  });

  it('disjunctionEliminationSaga() should catch the error', () => {
    testSaga(disjunctionEliminationSaga)
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
      .put(actions.setError(errorsTexts.generalError))
      .next()
      .isDone();
  });
});

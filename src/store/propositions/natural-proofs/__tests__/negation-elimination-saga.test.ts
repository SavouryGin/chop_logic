import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { negationEliminationSaga, negationEliminationWatcher } from '../sagas/negation-elimination';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP negationEliminationSaga tests', () => {
  it('negationEliminationWatcher() should call the saga on action', () => {
    testSaga(negationEliminationWatcher).next().takeEvery(actions.eliminateNegation, negationEliminationSaga).next().isDone();
  });

  it('negationEliminationSaga() should catch the error', () => {
    testSaga(negationEliminationSaga)
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
      .put(actions.setError(mocks.error.message))
      .next()
      .isDone();
  });
});

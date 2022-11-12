import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { conjunctionIntroductionSaga, conjunctionIntroductionWatcher } from '../sagas/conjunction-introduction';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP conjunctionIntroductionSaga tests', () => {
  it('conjunctionIntroductionWatcher() should call the saga on action', () => {
    testSaga(conjunctionIntroductionWatcher).next().takeEvery(actions.createConjunction, conjunctionIntroductionSaga).next().isDone();
  });

  it('conjunctionIntroductionSaga() should catch the error', () => {
    testSaga(conjunctionIntroductionSaga)
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
      .put(actions.setError(mocks.error.message))
      .next()
      .isDone();
  });
});

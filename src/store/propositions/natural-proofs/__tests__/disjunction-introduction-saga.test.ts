import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { disjunctionIntroductionSaga, disjunctionIntroductionWatcher } from '../sagas/disjunction-introduction';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP disjunctionIntroductionSaga tests', () => {
  it('disjunctionIntroductionWatcher() should call the saga on action', () => {
    testSaga(disjunctionIntroductionWatcher).next().takeEvery(actions.createDisjunction, disjunctionIntroductionSaga).next().isDone();
  });

  it('disjunctionIntroductionSaga() should catch the error', () => {
    testSaga(disjunctionIntroductionSaga, { payload: 'p' })
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

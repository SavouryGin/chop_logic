import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'assets/texts/propositions/elements';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { conjunctionIntroductionSaga, conjunctionIntroductionWatcher } from '../sagas/conjunction-introduction';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP conjunctionIntroductionSaga tests', () => {
  it('conjunctionIntroductionWatcher() should call the saga on action', () => {
    testSaga(conjunctionIntroductionWatcher).next().takeEvery(actions.createConjunction, conjunctionIntroductionSaga).next().isDone();
  });

  it('conjunctionIntroductionSaga() should catch the error', () => {
    testSaga(conjunctionIntroductionSaga)
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

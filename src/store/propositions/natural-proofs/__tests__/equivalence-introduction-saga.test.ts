import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { equivalenceIntroductionSaga, equivalenceIntroductionWatcher } from '../sagas/equivalence-introduction';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP equivalenceIntroductionSaga tests', () => {
  it('equivalenceIntroductionWatcher() should call the saga on action', () => {
    testSaga(equivalenceIntroductionWatcher).next().takeEvery(actions.createEquivalence, equivalenceIntroductionSaga).next().isDone();
  });

  it('equivalenceIntroductionSaga() should catch the error', () => {
    testSaga(equivalenceIntroductionSaga)
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

import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { equivalenceIntroductionSaga, equivalenceIntroductionWatcher } from '../sagas/equivalence-introduction';
import { errorsTexts } from 'texts';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP equivalenceIntroductionSaga tests', () => {
  it('equivalenceIntroductionWatcher() should call the saga on action', () => {
    testSaga(equivalenceIntroductionWatcher).next().takeEvery(actions.createEquivalence, equivalenceIntroductionSaga).next().isDone();
  });

  it('equivalenceIntroductionSaga() should catch the error', () => {
    testSaga(equivalenceIntroductionSaga)
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

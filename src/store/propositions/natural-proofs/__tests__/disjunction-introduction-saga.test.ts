import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { disjunctionIntroductionSaga, disjunctionIntroductionWatcher } from '../sagas/disjunction-introduction';
import { errorsTexts } from 'texts';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP disjunctionIntroductionSaga tests', () => {
  it('disjunctionIntroductionWatcher() should call the saga on action', () => {
    testSaga(disjunctionIntroductionWatcher).next().takeEvery(actions.createDisjunction, disjunctionIntroductionSaga).next().isDone();
  });

  it('disjunctionIntroductionSaga() should catch the error', () => {
    testSaga(disjunctionIntroductionSaga, { payload: 'p' })
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

import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { negationIntroductionSaga, negationIntroductionWatcher } from '../sagas/negation-introduction';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP negationIntroductionSaga tests', () => {
  it('negationIntroductionWatcher() should call the saga on action', () => {
    testSaga(negationIntroductionWatcher).next().takeEvery(actions.createNegation, negationIntroductionSaga).next().isDone();
  });

  it('negationIntroductionSaga() should catch the error', () => {
    testSaga(negationIntroductionSaga)
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

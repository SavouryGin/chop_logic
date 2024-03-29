import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'utils/texts/propositions/elements';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { negationIntroductionSaga, negationIntroductionWatcher } from '../sagas/negation-introduction';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP negationIntroductionSaga tests', () => {
  it('negationIntroductionWatcher() should call the saga on action', () => {
    testSaga(negationIntroductionWatcher).next().takeEvery(actions.createNegation, negationIntroductionSaga).next().isDone();
  });

  it('negationIntroductionSaga() should catch the error', () => {
    testSaga(negationIntroductionSaga)
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

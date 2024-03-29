import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'utils/texts/propositions/elements';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { implicationIntroductionSaga, implicationIntroductionWatcher } from '../sagas/implication-introduction';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP implicationIntroductionSaga tests', () => {
  it('implicationIntroductionWatcher() should call the saga on action', () => {
    testSaga(implicationIntroductionWatcher).next().takeEvery(actions.createImplication, implicationIntroductionSaga).next().isDone();
  });

  it('implicationIntroductionSaga() should catch the error', () => {
    testSaga(implicationIntroductionSaga)
      .next()
      .select(selectors.allSubProofsItems)
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

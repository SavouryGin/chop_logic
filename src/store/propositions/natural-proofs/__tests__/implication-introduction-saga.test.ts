import mocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { errorsTexts } from 'texts';
import { implicationIntroductionSaga, implicationIntroductionWatcher } from '../sagas/implication-introduction';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP implicationIntroductionSaga tests', () => {
  it('implicationIntroductionWatcher() should call the saga on action', () => {
    testSaga(implicationIntroductionWatcher).next().takeEvery(actions.createImplication, implicationIntroductionSaga).next().isDone();
  });

  it('implicationIntroductionSaga() should catch the error', () => {
    testSaga(implicationIntroductionSaga)
      .next()
      .select(selectors.getAllSubProofsItems)
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

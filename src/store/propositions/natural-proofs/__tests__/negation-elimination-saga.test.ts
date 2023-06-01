import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { negationEliminationSaga, negationEliminationWatcher } from '../sagas/negation-elimination';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP negationEliminationSaga tests', () => {
  it('negationEliminationWatcher() should call the saga on action', () => {
    testSaga(negationEliminationWatcher).next().takeEvery(actions.eliminateNegation, negationEliminationSaga).next().isDone();
  });

  it('negationEliminationSaga() should catch the error', () => {
    testSaga(negationEliminationSaga)
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

import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { implicationEliminationSaga, implicationEliminationWatcher } from '../sagas/implication-elimination';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP implicationEliminationSaga tests', () => {
  it('implicationEliminationWatcher() should call the saga on action', () => {
    testSaga(implicationEliminationWatcher).next().takeEvery(actions.eliminateImplication, implicationEliminationSaga).next().isDone();
  });

  it('implicationEliminationSaga() should catch the error', () => {
    testSaga(implicationEliminationSaga)
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
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

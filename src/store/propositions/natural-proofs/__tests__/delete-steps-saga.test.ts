import mocks from '__mocks__/data/propositions/table-items';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { deleteNaturalProofStepsWatcher, deleteNaturalProofsStepsSaga } from '../sagas/delete-steps';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP deleteNaturalProofsStepsSaga tests', () => {
  const testSelectedIds = [mocks.npTableDataIEandII[1].id, mocks.npTableDataIEandII[2].id];

  it('deleteNaturalProofStepsWatcher() should call the saga on action', () => {
    testSaga(deleteNaturalProofStepsWatcher).next().takeEvery(actions.deleteSteps, deleteNaturalProofsStepsSaga).next().isDone();
  });

  it('deleteNaturalProofsStepsSaga() should delete the steps without dependencies', () => {
    testSaga(deleteNaturalProofsStepsSaga, { payload: { isConfirmed: true } })
      .next()
      .select(selectors.selectedIds)
      .next([])
      .select(selectors.tableData)
      .next([])
      .put(actions.setTableData([]))
      .next()
      .put(actions.setSelectedIds([]))
      .next()
      .isDone();
  });

  it('deleteNaturalProofsStepsSaga() should delete the steps with dependencies', () => {
    testSaga(deleteNaturalProofsStepsSaga, { payload: { isConfirmed: true } })
      .next()
      .select(selectors.selectedIds)
      .next(testSelectedIds)
      .select(selectors.tableData)
      .next(mocks.npTableDataIEandII)
      .put(actions.setTableData([mocks.npTableDataIEandII[0]]))
      .next()
      .put(actions.setDependentItems([]))
      .next()
      .put(actions.setSelectedIds([]))
      .next()
      .isDone();
  });

  it('deleteNaturalProofsStepsSaga() should show the confirmation popup', () => {
    testSaga(deleteNaturalProofsStepsSaga, { payload: { isConfirmed: false } })
      .next()
      .select(selectors.selectedIds)
      .next(testSelectedIds)
      .select(selectors.tableData)
      .next(mocks.npTableDataIEandII)
      .put(actions.setDependentItems([mocks.npTableDataIEandII[3]]))
      .next()
      .put(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: true }))
      .next()
      .isDone();
  });

  it('deleteNaturalProofsStepsSaga() should catch the error', () => {
    testSaga(deleteNaturalProofsStepsSaga, { payload: { isConfirmed: false } })
      .next()
      .select(selectors.selectedIds)
      .next(testSelectedIds)
      .select(selectors.tableData)
      .next(mocks.npTableDataIEandII)
      .throw(mocks.error)
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

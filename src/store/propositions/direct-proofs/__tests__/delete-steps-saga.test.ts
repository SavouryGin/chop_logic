import mocks from '__mocks__/data/propositions/table-items';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { deleteDirectProofStepsSaga, deleteDirectProofStepsWatcher } from '../sagas/delete-steps';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('DP deleteDirectProofStepsSaga tests', () => {
  const testSelectedIds = [mocks.dpTableDataIE[1].id];

  it('deleteDirectProofStepsWatcher() should call the saga on action', () => {
    testSaga(deleteDirectProofStepsWatcher).next().takeEvery(actions.deleteSteps, deleteDirectProofStepsSaga).next().isDone();
  });

  it('deleteDirectProofStepsSaga() should delete the steps without dependencies', () => {
    testSaga(deleteDirectProofStepsSaga, { payload: { isConfirmed: true } })
      .next()
      .select(selectors.getSelectedIds)
      .next([])
      .select(selectors.getTableData)
      .next([])
      .put(actions.setTableData([]))
      .next()
      .put(actions.setSelectedIds([]))
      .next()
      .isDone();
  });

  it('deleteDirectProofStepsSaga() should delete the steps with dependencies', () => {
    testSaga(deleteDirectProofStepsSaga, { payload: { isConfirmed: true } })
      .next()
      .select(selectors.getSelectedIds)
      .next(testSelectedIds)
      .select(selectors.getTableData)
      .next(mocks.dpTableDataIE)
      .put(actions.setTableData([mocks.dpTableDataIE[0]]))
      .next()
      .put(actions.setDependentItems([]))
      .next()
      .put(actions.setSelectedIds([]))
      .next()
      .isDone();
  });

  it('deleteDirectProofStepsSaga() should show the confirmation popup', () => {
    testSaga(deleteDirectProofStepsSaga, { payload: { isConfirmed: false } })
      .next()
      .select(selectors.getSelectedIds)
      .next(testSelectedIds)
      .select(selectors.getTableData)
      .next(mocks.dpTableDataIE)
      .put(actions.setDependentItems([mocks.dpTableDataIE[2]]))
      .next()
      .put(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: true }))
      .next()
      .isDone();
  });

  it('deleteDirectProofStepsSaga() should catch the error', () => {
    testSaga(deleteDirectProofStepsSaga, { payload: { isConfirmed: false } })
      .next()
      .select(selectors.getSelectedIds)
      .next(testSelectedIds)
      .select(selectors.getTableData)
      .next(mocks.dpTableDataIE)
      .throw(mocks.error)
      .put(actions.setError(mocks.error.message))
      .next()
      .isDone();
  });
});

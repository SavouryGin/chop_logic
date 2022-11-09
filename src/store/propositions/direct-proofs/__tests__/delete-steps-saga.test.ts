import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { deleteDirectProofStepsSaga, deleteDirectProofStepsWatcher } from '../sagas/delete-steps';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('DP deleteDirectProofStepsSaga tests', () => {
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
});

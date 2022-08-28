import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { findDependentDPItemsToDelete, updateDPTableData, updateTableComments } from 'store/propositions/helpers';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* deleteDirectProofStepsWatcher(): Generator {
  yield takeEvery(actions.deleteSteps, deleteDirectProofStepsSaga);
}

export function* deleteDirectProofStepsSaga(action: { payload: { isConfirmed: boolean } }): SagaIterator {
  try {
    const isConfirmed = action.payload.isConfirmed;
    const selectedIds: string[] = yield select(selectors.getSelectedIds);
    const tableData: DirectProofsTableItem[] = yield select(selectors.getTableData);
    const dependentItems = findDependentDPItemsToDelete(selectedIds, tableData);
    const isConfirmationNeeded = dependentItems.length && selectedIds.length !== tableData.length;

    if (isConfirmationNeeded) {
      if (isConfirmed) {
        const dependentIds = dependentItems.map((item) => item.id);
        const idsToDelete = [...dependentIds, ...selectedIds];

        yield put(actions.setTableData(updateTableComments(updateDPTableData(tableData, idsToDelete))));
        yield put(actions.setDependentItems([]));
        yield put(actions.setSelectedIds([]));
      } else {
        yield put(actions.setDependentItems(dependentItems));
        yield put(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: true }));

        return;
      }
    } else {
      yield put(actions.setTableData(updateTableComments(updateDPTableData(tableData, selectedIds))));
      yield put(actions.setSelectedIds([]));
    }
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Delete action error';
    yield put(actions.setError(errorMessage));
  }
}

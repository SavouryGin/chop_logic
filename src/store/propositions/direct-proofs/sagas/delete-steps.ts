import propositionsElementsTexts from 'utils/texts/propositions/elements';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { SagaIterator } from 'redux-saga';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { findDependentDPItemsToDelete, removeSelectedItemsFromTable, updateDPTableComments } from 'logic/propositions/helpers';
import { put, select, takeEvery } from 'redux-saga/effects';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* deleteDirectProofStepsWatcher(): Generator {
  yield takeEvery(actions.deleteSteps, deleteDirectProofStepsSaga);
}

export function* deleteDirectProofStepsSaga(action: { payload: { isConfirmed: boolean } }): SagaIterator {
  try {
    const isConfirmed = action.payload.isConfirmed;
    const selectedIds: string[] = yield select(selectors.selectedIds);
    const tableData: DirectProofsTableItem[] = yield select(selectors.tableData);
    const dependentItems = findDependentDPItemsToDelete(selectedIds, tableData);
    const isConfirmationNeeded = dependentItems.length && selectedIds.length !== tableData.length;

    if (isConfirmationNeeded) {
      if (isConfirmed) {
        const dependentIds = dependentItems.map((item) => item.id);
        const idsToDelete = [...dependentIds, ...selectedIds];

        yield put(actions.setTableData(updateDPTableComments(removeSelectedItemsFromTable(tableData, idsToDelete))));
        yield put(actions.setDependentItems([]));
        yield put(actions.setSelectedIds([]));
      } else {
        yield put(actions.setDependentItems(dependentItems));
        yield put(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: true }));

        return;
      }
    } else {
      yield put(actions.setTableData(updateDPTableComments(removeSelectedItemsFromTable(tableData, selectedIds))));
      yield put(actions.setSelectedIds([]));
    }
  } catch (error: unknown) {
    yield put(actions.setError(propositionsElementsTexts.generalError));
  }
}

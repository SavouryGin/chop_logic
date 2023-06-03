import propositionsElementsTexts from 'texts/propositions/elements';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { SagaIterator } from 'redux-saga';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { findDependentNPItemsToDelete, removeSelectedItemsFromTable, updateNPTableComments } from 'logic/propositions/helpers';
import { put, select, takeEvery } from 'redux-saga/effects';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* deleteNaturalProofStepsWatcher(): Generator {
  yield takeEvery(actions.deleteSteps, deleteNaturalProofsStepsSaga);
}

export function* deleteNaturalProofsStepsSaga(action: { payload: { isConfirmed: boolean } }): SagaIterator {
  try {
    const isConfirmed = action.payload.isConfirmed;
    const selectedIds: string[] = yield select(selectors.selectedIds);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const dependentItems = findDependentNPItemsToDelete(selectedIds, tableData);
    const isConfirmationNeeded = dependentItems.length && selectedIds.length !== tableData.length;

    if (isConfirmationNeeded) {
      if (isConfirmed) {
        const dependentIds = dependentItems.map((item) => item.id);
        const idsToDelete = [...dependentIds, ...selectedIds];

        yield put(actions.setTableData(updateNPTableComments(removeSelectedItemsFromTable(tableData, idsToDelete))));
        yield put(actions.setDependentItems([]));
        yield put(actions.setSelectedIds([]));
      } else {
        yield put(actions.setDependentItems(dependentItems));
        yield put(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: true }));

        return;
      }
    } else {
      yield put(actions.setTableData(updateNPTableComments(removeSelectedItemsFromTable(tableData, selectedIds))));
      yield put(actions.setSelectedIds([]));
    }
  } catch (error: unknown) {
    yield put(actions.setError(propositionsElementsTexts.generalError));
  }
}

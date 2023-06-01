import propositionsTexts from 'texts/propositions/elements';
import { DirectProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs';
import { findDependentDPItemsToDelete, removeSelectedItemsFromTable, updateDPTableComments } from 'logic/propositions/helpers';
import { put, select, takeEvery } from 'redux-saga/effects';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* cutStepsDPWatcher(): Generator {
  yield takeEvery(actions.cutSteps, cutStepsDPSaga);
}

export function* cutStepsDPSaga(action: { payload: { isConfirmed: boolean } }): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.selectedIds);
    const isConfirmed = action.payload.isConfirmed;
    const tableItems: DirectProofsTableItem[] = yield select(selectors.tableData);
    const dependentItems = findDependentDPItemsToDelete(selectedIds, tableItems);
    const isConfirmationNeeded = dependentItems.length && selectedIds.length !== tableItems.length;
    const itemsToCut = tableItems.filter((item) => selectedIds.includes(item.id));

    if (isConfirmationNeeded) {
      if (isConfirmed) {
        const dependentIds = dependentItems.map((item) => item.id);
        const idsToDelete = [...dependentIds, ...selectedIds];

        // Update table data
        yield put(actions.setTableData(updateDPTableComments(removeSelectedItemsFromTable(tableItems, idsToDelete))));

        // Save removed items to the clipboard
        yield put(actions.setClipboardData(itemsToCut));

        // Clear store values
        yield put(actions.setDependentItems([]));
        yield put(actions.setSelectedIds([]));
      } else {
        yield put(actions.setDependentItems(dependentItems));
        yield put(actions.setUpFlag({ flag: 'isConfirmCutPopupOpened', value: true }));

        return;
      }
    } else {
      // Update table data
      yield put(actions.setTableData(updateDPTableComments(removeSelectedItemsFromTable(tableItems, selectedIds))));

      // Save removed items to the clipboard
      yield put(actions.setClipboardData(itemsToCut));

      // Clear store values
      yield put(actions.setSelectedIds([]));
    }
  } catch (error: unknown) {
    yield put(actions.setError(propositionsTexts.generalError));
  }
}

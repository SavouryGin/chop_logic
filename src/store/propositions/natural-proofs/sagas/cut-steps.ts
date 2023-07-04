import errorsTexts from 'assets/texts/propositions/elements';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { findDependentNPItemsToDelete, removeSelectedItemsFromTable, updateNPTableComments } from 'logic/propositions/helpers';
import { put, select, takeEvery } from 'redux-saga/effects';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* cutStepsNPWatcher(): Generator {
  yield takeEvery(actions.cutSteps, cutStepsNPSaga);
}

export function* cutStepsNPSaga(action: { payload: { isConfirmed: boolean } }): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.selectedIds);
    const isConfirmed = action.payload.isConfirmed;
    const tableItems: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const dependentItems = findDependentNPItemsToDelete(selectedIds, tableItems);
    const isConfirmationNeeded = dependentItems.length && selectedIds.length !== tableItems.length;
    const itemsToCut = tableItems.filter((item) => selectedIds.includes(item.id));

    if (isConfirmationNeeded) {
      if (isConfirmed) {
        const dependentIds = dependentItems.map((item) => item.id);
        const idsToDelete = [...dependentIds, ...selectedIds];

        // Update table data
        yield put(actions.setTableData(updateNPTableComments(removeSelectedItemsFromTable(tableItems, idsToDelete))));

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
      yield put(actions.setTableData(updateNPTableComments(removeSelectedItemsFromTable(tableItems, selectedIds))));

      // Save removed items to the clipboard
      yield put(actions.setClipboardData(itemsToCut));

      // Clear store values
      yield put(actions.setSelectedIds([]));
    }
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

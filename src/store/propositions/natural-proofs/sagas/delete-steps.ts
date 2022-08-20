import { NaturalProofsTableDataItem } from 'store/propositions/natural-proofs/interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* deleteNaturalProofStepsWatcher(): Generator {
  yield takeEvery(actions.deleteSteps, deleteNaturalProofsStepsSaga);
}

export function* deleteNaturalProofsStepsSaga(): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.getSelectedIds);
    const tableData: NaturalProofsTableDataItem[] = yield select(selectors.getTableData);

    const newData: NaturalProofsTableDataItem[] = tableData
      .filter((item) => !selectedIds.includes(item.id))
      .map((item, index) => {
        return {
          ...item,
          step: index + 1,
          id: `proof-step-${index + 1}`,
        };
      });

    yield put(actions.setSelectedIds([]));
    yield put(actions.setTableData(newData));
  } catch (error: unknown) {
    console.error(error);
  }
}

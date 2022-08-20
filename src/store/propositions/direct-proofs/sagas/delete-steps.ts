import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* deleteDirectProofStepsWatcher(): Generator {
  yield takeEvery(actions.deleteSteps, deleteDirectProofStepsSaga);
}

export function* deleteDirectProofStepsSaga(): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.getSelectedIds);
    const tableData: DirectProofsTableItem[] = yield select(selectors.getTableData);

    const newData: DirectProofsTableItem[] = tableData
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

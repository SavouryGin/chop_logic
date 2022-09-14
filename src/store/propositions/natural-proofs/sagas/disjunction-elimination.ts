// import executor from 'logic/propositions/executor';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* disjunctionEliminationWatcher(): Generator {
  yield takeEvery(actions.eliminateDisjunction, disjunctionEliminationSaga);
}

export function* disjunctionEliminationSaga(): SagaIterator {
  try {
    const selectedItems: NaturalProofsTableItem[] = yield select(selectors.getSelectedTableItems);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.getTableData);
    console.log('Saga', selectedItems);
    // const dataLength: number = yield select(selectors.getTableDataLength);
    // const level: number = yield select(selectors.getLastTableItemLevel);
    // const rawInput = action.payload;

    // const newItems = executor.performDI({ rawInput, level, dataLength, selectedItems });

    yield put(actions.setTableData([...tableData]));
    yield put(actions.setSelectedIds([]));
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Delete action error';
    yield put(actions.setError(errorMessage));
  }
}

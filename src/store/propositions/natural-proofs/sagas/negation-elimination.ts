import executor from 'logic/propositions/executor';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* negationEliminationWatcher(): Generator {
  yield takeEvery(actions.eliminateNegation, negationEliminationSaga);
}

export function* negationEliminationSaga(): SagaIterator {
  try {
    const selectedItems: NaturalProofsTableItem[] = yield select(selectors.getSelectedTableItems);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.getTableData);
    const dataLength: number = yield select(selectors.getTableDataLength);
    const level: number = yield select(selectors.getLastTableItemLevel);
    const newItem = executor.performNE({ level, dataLength, selectedItems });

    yield put(actions.setTableData([...tableData, newItem]));
    yield put(actions.setSelectedIds([]));
  } catch (error: unknown) {
    console.error(error);
    const errorMessage = (error as any)?.message || 'Negation elimination error';
    yield put(actions.setError(errorMessage));
  }
}

import errorsTexts from 'utils/texts/propositions/elements';
import executor from 'logic/propositions/executor';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { put, select, takeEvery } from 'redux-saga/effects';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* disjunctionEliminationWatcher(): Generator {
  yield takeEvery(actions.eliminateDisjunction, disjunctionEliminationSaga);
}

export function* disjunctionEliminationSaga(): SagaIterator {
  try {
    const selectedItems: NaturalProofsTableItem[] = yield select(selectors.selectedTableItems);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const dataLength: number = yield select(selectors.tableDataLength);
    const level: number = yield select(selectors.lastTableItemLevel);
    const assumptionId: string | null = yield select(selectors.lastItemAssumptionId);

    const newItem = executor.performDE({ level, dataLength, selectedItems, assumptionId });

    yield put(actions.setTableData([...tableData, newItem]));
    yield put(actions.setSelectedIds([]));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

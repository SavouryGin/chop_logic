import executor from 'logic/propositions/executor';
import propositionsElementsTexts from 'texts/propositions/elements';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { put, select, takeEvery } from 'redux-saga/effects';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* implicationEliminationWatcher(): Generator {
  yield takeEvery(actions.eliminateImplication, implicationEliminationSaga);
}

export function* implicationEliminationSaga(): SagaIterator {
  try {
    const selectedItems: NaturalProofsTableItem[] = yield select(selectors.selectedTableItems);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const dataLength: number = yield select(selectors.tableDataLength);
    const level: number = yield select(selectors.lastTableItemLevel);
    const assumptionId: string | null = yield select(selectors.lastItemAssumptionId);

    const newItem = executor.performIEforNP({ level, dataLength, selectedItems, assumptionId });

    yield put(actions.setTableData([...tableData, newItem]));
    yield put(actions.setSelectedIds([]));
  } catch (error: unknown) {
    yield put(actions.setError(propositionsElementsTexts.generalError));
  }
}

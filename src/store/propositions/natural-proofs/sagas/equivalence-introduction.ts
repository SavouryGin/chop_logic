import executor from 'logic/propositions/executor';
import propositionsElementsTexts from 'utils/texts/propositions/elements';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { put, select, takeEvery } from 'redux-saga/effects';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* equivalenceIntroductionWatcher(): Generator {
  yield takeEvery(actions.createEquivalence, equivalenceIntroductionSaga);
}

export function* equivalenceIntroductionSaga(): SagaIterator {
  try {
    const selectedItems: NaturalProofsTableItem[] = yield select(selectors.selectedTableItems);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const dataLength: number = yield select(selectors.tableDataLength);
    const level: number = yield select(selectors.lastTableItemLevel);
    const assumptionId: string | null = yield select(selectors.lastItemAssumptionId);

    const newItems = executor.performEI({ level, dataLength, selectedItems, assumptionId });

    yield put(actions.setTableData([...tableData, ...newItems]));
    yield put(actions.setSelectedIds([]));
  } catch (error: unknown) {
    yield put(actions.setError(propositionsElementsTexts.generalError));
  }
}

import errorsTexts from 'texts/propositions/elements';
import executor from 'logic/propositions/executor';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* negationIntroductionWatcher(): Generator {
  yield takeEvery(actions.createNegation, negationIntroductionSaga);
}

export function* negationIntroductionSaga(): SagaIterator {
  try {
    const selectedItems: NaturalProofsTableItem[] = yield select(selectors.getSelectedTableItems);
    const tableData: NaturalProofsTableItem[] = yield select(selectors.getTableData);
    const dataLength: number = yield select(selectors.getTableDataLength);
    const level: number = yield select(selectors.getLastTableItemLevel);
    const assumptionId: string | null = yield select(selectors.getLastItemAssumptionId);

    const newItem = executor.performNI({ level, dataLength, selectedItems, assumptionId });

    yield put(actions.setTableData([...tableData, newItem]));
    yield put(actions.setSelectedIds([]));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

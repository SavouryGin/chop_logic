import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { errorsTexts } from 'texts';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* cutSubProofNPWatcher(): Generator {
  yield takeEvery(actions.cutSubProof, cutSubProofNPSaga);
}

export function* cutSubProofNPSaga(): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.getSelectedIds);
    const tableItems: NaturalProofsTableItem[] = yield select(selectors.getTableData);

    const filteredItems = tableItems.filter((item) => !selectedIds.includes(item.id));
    const removedItems = tableItems.filter((item) => selectedIds.includes(item.id));
    const enumeratedItems = filteredItems.map((item, index) => ({ ...item, step: index + 1 }));

    yield put(actions.setTableData(enumeratedItems));
    yield put(actions.setClipboardData(removedItems));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

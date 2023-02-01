import { DirectProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs';
import { errorsTexts } from 'texts';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* cutSubProofDPWatcher(): Generator {
  yield takeEvery(actions.cutSubProof, cutSubProofDPSaga);
}

export function* cutSubProofDPSaga(): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.getSelectedIds);
    const tableItems: DirectProofsTableItem[] = yield select(selectors.getTableData);

    const filteredItems = tableItems.filter((item) => !selectedIds.includes(item.id));
    const removedItems = tableItems.filter((item) => selectedIds.includes(item.id));
    const enumeratedItems = filteredItems.map((item, index) => ({ ...item, step: index + 1 }));

    yield put(actions.setTableData(enumeratedItems));
    yield put(actions.setClipboardData(removedItems));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

import { DirectProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs';
import { errorsTexts } from 'texts';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* pasteSubProofDPWatcher(): Generator {
  yield takeEvery(actions.pasteSubProof, pasteSubProofDPSaga);
}

export function* pasteSubProofDPSaga(): SagaIterator {
  try {
    const tableItems: DirectProofsTableItem[] = yield select(selectors.getTableData);
    const clipboardData: DirectProofsTableItem[] = yield select(selectors.getClipboardData);
    const mergedData = [...tableItems, ...clipboardData].map((item, index) => ({ ...item, step: index + 1 }));

    yield put(actions.setTableData(mergedData));
    yield put(actions.setClipboardData([]));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

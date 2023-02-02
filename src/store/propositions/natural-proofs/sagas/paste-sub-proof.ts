import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { errorsTexts } from 'texts';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* pasteSubProofNPWatcher(): Generator {
  yield takeEvery(actions.pasteSubProof, pasteSubProofNPSaga);
}

export function* pasteSubProofNPSaga(): SagaIterator {
  try {
    const tableItems: NaturalProofsTableItem[] = yield select(selectors.getTableData);
    const clipboardData: NaturalProofsTableItem[] = yield select(selectors.getClipboardData);
    const mergedData = [...tableItems, ...clipboardData].map((item, index) => ({ ...item, step: index + 1 }));

    yield put(actions.setTableData(mergedData));
    yield put(actions.setClipboardData([]));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

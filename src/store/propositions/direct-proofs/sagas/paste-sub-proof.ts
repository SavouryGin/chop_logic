import { DirectProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { errorsTexts } from 'texts';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* pasteSubProofDPWatcher(): Generator {
  yield takeEvery(actions.pasteSubProof, pasteSubProofDPSaga);
}

export function* pasteSubProofDPSaga(): SagaIterator {
  try {
    console.log('pasteSubProofDPSaga');
    const clipboardData: DirectProofsTableItem[] = yield select(selectors.getClipboardData);
    console.log('clipboardData', clipboardData);
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

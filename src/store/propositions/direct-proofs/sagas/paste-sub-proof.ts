import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { errorsTexts } from 'texts';
import { put, takeEvery } from 'redux-saga/effects';

export function* pasteSubProofDPWatcher(): Generator {
  yield takeEvery(actions.pasteSubProof, pasteSubProofDPSaga);
}

export function* pasteSubProofDPSaga(): SagaIterator {
  try {
    console.log('pasteSubProofDPSaga');
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

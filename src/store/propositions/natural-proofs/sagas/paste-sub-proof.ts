import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { errorsTexts } from 'texts';
import { put, takeEvery } from 'redux-saga/effects';

export function* pasteSubProofNPWatcher(): Generator {
  yield takeEvery(actions.pasteSubProof, pasteSubProofNPSaga);
}

export function* pasteSubProofNPSaga(): SagaIterator {
  try {
    console.log('pasteSubProofDPSaga');
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

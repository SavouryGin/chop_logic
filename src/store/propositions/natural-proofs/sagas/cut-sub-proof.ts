import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs';
import { errorsTexts } from 'texts';
import { put, takeEvery } from 'redux-saga/effects';

export function* cutSubProofNPWatcher(): Generator {
  yield takeEvery(actions.cutSubProof, cutSubProofNPSaga);
}

export function* cutSubProofNPSaga(): SagaIterator {
  try {
    console.log('cutSubProofNPSaga');
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

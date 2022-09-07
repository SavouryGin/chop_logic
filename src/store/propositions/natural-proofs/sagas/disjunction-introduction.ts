import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { put, select, takeEvery } from 'redux-saga/effects';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* disjunctionIntroductionWatcher(): Generator {
  yield takeEvery(actions.createDisjunction, disjunctionIntroductionSaga);
}

export function* disjunctionIntroductionSaga(action: { payload: string }): SagaIterator {
  try {
    const selectedIds: string[] = yield select(selectors.getSelectedIds);
    const input = action.payload;
    console.log('SAGA', selectedIds, input);
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Delete action error';
    yield put(actions.setError(errorMessage));
  }
}

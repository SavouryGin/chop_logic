import propositionsTexts from 'utils/texts/propositions/elements';
import { DirectProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { put, select, takeEvery } from 'redux-saga/effects';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

export function* pasteStepsDPWatcher(): Generator {
  yield takeEvery(actions.pasteSteps, pasteStepsDPSaga);
}

export function* pasteStepsDPSaga(): SagaIterator {
  try {
    const tableItems: DirectProofsTableItem[] = yield select(selectors.tableData);
    const clipboardData: DirectProofsTableItem[] = yield select(selectors.clipboardData);
    const mergedData = [...tableItems, ...clipboardData].map((item, index) => ({ ...item, step: index + 1 }));

    yield put(actions.setTableData(mergedData));
    yield put(actions.setClipboardData([]));
  } catch (error: unknown) {
    yield put(actions.setError(propositionsTexts.generalError));
  }
}

import errorsTexts from 'texts/propositions/elements';
import { NaturalProofsTableItem } from '../interfaces';
import { SagaIterator } from 'redux-saga';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { put, select, takeEvery } from 'redux-saga/effects';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';

export function* pasteStepsNPWatcher(): Generator {
  yield takeEvery(actions.pasteSteps, pasteStepsNPSaga);
}

export function* pasteStepsNPSaga(): SagaIterator {
  try {
    const tableItems: NaturalProofsTableItem[] = yield select(selectors.tableData);
    const clipboardData: NaturalProofsTableItem[] = yield select(selectors.clipboardData);
    const mergedData = [...tableItems, ...clipboardData].map((item, index) => ({ ...item, step: index + 1 }));

    yield put(actions.setTableData(mergedData));
    yield put(actions.setClipboardData([]));
  } catch (error: unknown) {
    yield put(actions.setError(errorsTexts.generalError));
  }
}

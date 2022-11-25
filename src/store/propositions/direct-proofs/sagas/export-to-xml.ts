import { SagaIterator } from 'redux-saga';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { put, takeEvery } from 'redux-saga/effects';

export function* exportDPToXMLWatcher(): Generator {
  yield takeEvery(actions.exportToXML, exportDPToXMLSaga);
}

export function* exportDPToXMLSaga(action: { payload: string | undefined }): SagaIterator {
  try {
    console.log('Export Saga');
    const fileName = action.payload;

    if (!fileName) {
      yield put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }));

      return;
    }

    console.log('File name', fileName);
  } catch (error: unknown) {
    const errorMessage = (error as any)?.message || 'Export to XML error';
    yield put(actions.setError(errorMessage));
  }
}

import tMocks from '__mocks__/data/propositions/table-items';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { createAndSaveXMLFile } from 'helpers/files/create-and-save-xml-file';
import { errorsTexts } from 'texts';
import { exportNPToXMLSaga, exportNPToXMLWatcher } from '../sagas/export-to-xml';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP exportNPToXMLSaga tests', () => {
  const testFileName = 'test-name';

  it('exportNPToXMLWatcher() should call the saga on action', () => {
    testSaga(exportNPToXMLWatcher).next().takeEvery(actions.exportToXML, exportNPToXMLSaga).next().isDone();
  });

  it('exportNPToXMLSaga() should create an xml file', () => {
    testSaga(exportNPToXMLSaga, { payload: testFileName })
      .next()
      .select(selectors.getTableData)
      .next(tMocks.randomNaturalProof)
      .call(createAndSaveXMLFile, tMocks.randomNaturalProofXML, testFileName)
      .next()
      .isDone();
  });

  it('exportNPToXMLSaga() should call the popup if fileName is not defined', () => {
    testSaga(exportNPToXMLSaga, { payload: undefined })
      .next()
      .put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }))
      .next()
      .isDone();
  });

  it('exportNPToXMLSaga() should catch the error', () => {
    testSaga(exportNPToXMLSaga, { payload: testFileName })
      .next()
      .select(selectors.getTableData)
      .next(tMocks.dpTableDataIE)
      .throw(tMocks.error)
      .put(actions.setError(errorsTexts.generalError))
      .next()
      .isDone();
  });
});

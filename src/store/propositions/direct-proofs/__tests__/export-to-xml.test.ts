import propositionsElementsTexts from 'texts/propositions/elements';
import tMocks from '__mocks__/data/propositions/table-items';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { createAndSaveXMLFile } from 'helpers/files/create-and-save-xml-file';
import { exportDPToXMLSaga, exportDPToXMLWatcher } from '../sagas/export-to-xml';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('DP exportDPToXMLSaga tests', () => {
  const testFileName = 'test-name';

  it('exportDPToXMLWatcher() should call the saga on action', () => {
    testSaga(exportDPToXMLWatcher).next().takeEvery(actions.exportToXML, exportDPToXMLSaga).next().isDone();
  });

  it('exportDPToXMLSaga() should create an xml file', () => {
    testSaga(exportDPToXMLSaga, { payload: testFileName })
      .next()
      .select(selectors.tableData)
      .next(tMocks.dpTableDataIE)
      .call(createAndSaveXMLFile, tMocks.dpIEtoXML, testFileName)
      .next()
      .isDone();
  });

  it('exportDPToXMLSaga() should call the popup if fileName is not defined', () => {
    testSaga(exportDPToXMLSaga, { payload: undefined })
      .next()
      .put(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: true }))
      .next()
      .isDone();
  });

  it('exportDPToXMLSaga() should catch the error', () => {
    testSaga(exportDPToXMLSaga, { payload: testFileName })
      .next()
      .select(selectors.tableData)
      .next(tMocks.dpTableDataIE)
      .throw(tMocks.error)
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

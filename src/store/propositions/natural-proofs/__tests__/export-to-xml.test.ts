import propositionsElementsTexts from 'assets/texts/propositions/elements';
import tMocks from '__mocks__/data/propositions/table-items';
import { npActions as actions } from 'store/propositions/natural-proofs';
import { createAndSaveXMLFile } from 'utils/files/create-and-save-xml-file';
import { exportNPToXMLSaga, exportNPToXMLWatcher } from '../sagas/export-to-xml';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { testSaga } from 'redux-saga-test-plan';

describe('NP exportNPToXMLSaga tests', () => {
  const testFileName = 'test-name';

  it('exportNPToXMLWatcher() should call the saga on action', () => {
    testSaga(exportNPToXMLWatcher).next().takeEvery(actions.exportToXML, exportNPToXMLSaga).next().isDone();
  });

  it('exportNPToXMLSaga() should create an xml file', () => {
    testSaga(exportNPToXMLSaga, { payload: testFileName })
      .next()
      .select(selectors.tableData)
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
      .select(selectors.tableData)
      .next(tMocks.dpTableDataIE)
      .throw(tMocks.error)
      .put(actions.setError(propositionsElementsTexts.generalError))
      .next()
      .isDone();
  });
});

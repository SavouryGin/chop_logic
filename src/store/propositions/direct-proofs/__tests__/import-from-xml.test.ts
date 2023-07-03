import parser from 'logic/propositions/parser-xml-to-js';
import propositionsElementsTexts from 'texts/propositions/elements';
import tMocks from '__mocks__/data/propositions/table-items';
import { FileAcceptType } from 'enums/file-accept-type';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { importDPFromXMLSaga, importDPFromXMLWatcher } from '../sagas/import-from-xml';
import { readUserTextFile } from 'utils/files/read-user-text-file';
import { testSaga } from 'redux-saga-test-plan';

describe('DP importDPFromXMLSaga tests', () => {
  const testFile = new File([''], 'filename', { type: FileAcceptType.XML });

  it('importDPFromXMLWatcher() should call the saga on action', () => {
    testSaga(importDPFromXMLWatcher).next().takeEvery(actions.importFromXML, importDPFromXMLSaga).next().isDone();
  });

  it('importDPFromXMLSaga() should create an xml file', () => {
    testSaga(importDPFromXMLSaga, { payload: { file: testFile } })
      .next()
      .put(actions.setUpFlag({ flag: 'isLoading', value: true }))
      .next()
      .call(readUserTextFile, testFile)
      .next(tMocks.dpIEtoXML)
      .call(parser.xmlToDPTableData, tMocks.dpIEtoXML)
      .next(tMocks.dpTableDataIE)
      .put(actions.setTableData(tMocks.dpTableDataIE))
      .next()
      .put(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: false }))
      .next()
      .put(actions.setUpFlag({ flag: 'isLoading', value: false }))
      .next()
      .isDone();
  });

  it('importDPFromXMLSaga() should catch the error', () => {
    testSaga(importDPFromXMLSaga, { payload: { file: testFile } })
      .next()
      .put(actions.setUpFlag({ flag: 'isLoading', value: true }))
      .next()
      .throw(tMocks.error)
      .put(actions.setError(propositionsElementsTexts.importError))
      .next()
      .put(actions.setUpFlag({ flag: 'isLoading', value: false }))
      .next()
      .isDone();
  });
});

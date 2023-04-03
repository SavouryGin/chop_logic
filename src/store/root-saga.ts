import propositionsDPSagas from './propositions/direct-proofs/sagas';
import propositionsNPSagas from './propositions/natural-proofs/sagas';
import truthTableSagas from './propositions/truth-tables/sagas';
import { all } from 'redux-saga/effects';

function* rootSaga(): Generator {
  yield all([propositionsDPSagas(), propositionsNPSagas(), truthTableSagas()]);
}

export default rootSaga;

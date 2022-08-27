import propositionsDPSagas from './propositions/direct-proofs/sagas';
import propositionsNPSagas from './propositions/natural-proofs/sagas';
import { all } from 'redux-saga/effects';

function* rootSaga(): Generator {
  yield all([propositionsDPSagas(), propositionsNPSagas()]);
}

export default rootSaga;

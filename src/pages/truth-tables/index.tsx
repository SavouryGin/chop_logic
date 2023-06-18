import ErrorPopup from 'components/error-popup';
import React from 'react';
import TruthTableForm from './components/form';
import TruthTablesTable from './components/table';
import truthTablesSelectors from 'store/propositions/truth-tables/selectors';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const TruthTables = (): React.ReactElement => {
  const error = useAppSelector(truthTablesSelectors.error);
  const dispatch = useAppDispatch();

  const resetError = () => {
    dispatch(actions.setError(null));
  };

  return (
    <div className='truth-tables'>
      <TruthTableForm />
      <TruthTablesTable />
      <ErrorPopup onClose={resetError} error={error} />
    </div>
  );
};

export default TruthTables;

import ErrorPopup from 'components/error-popup';
import React from 'react';
import TruthTableForm from './components/form';
import TruthTablesTable from './components/table';
import truthTablesSelectors from 'store/propositions/truth-tables/selectors';
import { truthTablesActions } from 'store/propositions/truth-tables';
import { useAppDispatch, useAppSelector } from 'hooks';

const TruthTables = (): React.ReactElement => {
  const error = useAppSelector(truthTablesSelectors.error);
  const dispatch = useAppDispatch();

  const resetError = () => {
    dispatch(truthTablesActions.setError(null));
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

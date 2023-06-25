import ErrorPopup from 'components/error-popup';
import React from 'react';
import TruthTableForm from 'pages/propositions/components/forms/truth-table';
import TruthTablesTable from 'pages/propositions/components/tables/truth-table';
import truthTablesSelectors from 'store/propositions/truth-tables/selectors';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { useAppDispatch, useAppSelector } from 'hooks';
import 'pages/propositions/sub-pages/truth-tables/styles.scss';

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

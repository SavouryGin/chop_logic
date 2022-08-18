import React, { useEffect, useState } from 'react';
import Table from 'components/table';
import constants from 'presets/propositions';
import { propositionsNaturalProofsActions as actions } from 'store/propositions/natural-proofs/slice';
import { fillerNaturalText } from 'texts';
import { propositionsNaturalProofsSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

const NaturalProofsEditorTable = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.getLanguage);
  const tableData = useAppSelector(selectors.getTableData);
  const [selectedIds, setSelectedIds] = useState<string[]>(useAppSelector(selectors.getSelectedIds));
  const takeSelectedIds = (ids: string[]) => setSelectedIds(ids);

  useEffect(() => {
    dispatch(actions.setSelectedIds(selectedIds));
  }, [selectedIds]);

  const noStepsFiller = <div className='natural-proofs-editor__filler'>{fillerNaturalText[language]}</div>;

  return (
    <div className='natural-proofs-editor__table'>
      <Table columns={constants.naturalProofsEditorTableColumns} data={tableData} hasCheckboxColumn passSelectedIds={takeSelectedIds} />
      {tableData.length === 0 && noStepsFiller}
    </div>
  );
};

export default NaturalProofsEditorTable;

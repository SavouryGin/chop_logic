import React, { useEffect, useState } from 'react';
import Table from 'components/table';
import constants from 'presets/propositions';
import { fillerText } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

const NaturalProofsEditorTable = () => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const takeSelectedIds = (ids: string[]) => setSelectedIds(ids);

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);

  const noStepsFiller = <div className='direct-proofs-editor__filler'>{fillerText[language]}</div>;

  return (
    <div className='natural-proofs-editor__table'>
      <Table columns={constants.directProofsEditorTableColumns} data={[]} hasCheckboxColumn passSelectedIds={takeSelectedIds} />
      {noStepsFiller}
    </div>
  );
};

export default NaturalProofsEditorTable;

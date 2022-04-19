import React from 'react';
import DirectProofsEditorTable from './elements/direct-proofs-editor-table';
import DirectProofsEditorToolbar from './elements/direct-proofs-editor-toolbar';

import './styles.scss';

function DirectProofsEditor(): React.ReactElement {
  return (
    <div className='direct-proofs-editor'>
      <DirectProofsEditorTable />
      <DirectProofsEditorToolbar />
    </div>
  );
}

export default DirectProofsEditor;

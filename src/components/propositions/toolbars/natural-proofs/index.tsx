import Button from 'components/controls/button';
import React from 'react';
import { ButtonID } from 'enums';
import { soundPlayer } from 'helpers/sounds';

const NaturalProofsEditorToolbar = () => {
  return (
    <div className='natural-proofs-editor__toolbar'>
      <Button buttonId={ButtonID.Premise} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.Assumption} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.Reiteration} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.Delete} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.NotIntroduction} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.NotElimination} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.AndIntroduction} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.AndElimination} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.OrIntroduction} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.OrElimination} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.ImpliesIntroduction} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.ImpliesElimination} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.EquivIntroduction} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.EquivElimination} sound={soundPlayer.keyboard} size='large' />
    </div>
  );
};

export default NaturalProofsEditorToolbar;

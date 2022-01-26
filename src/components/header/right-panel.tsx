import React from 'react';
import Button from 'components/button';
import { Icon } from 'enums';

function RightHeaderPanel() {
  return (
    <>
      <Button icon={Icon.Settings} />
      <Button icon={Icon.Enlarge} />
      <Button icon={Icon.Left} />
    </>
  );
}

export default RightHeaderPanel;

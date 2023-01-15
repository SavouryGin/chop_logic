import React from 'react';

type ErrorPopupProps = {
  error: string | null;
};

const ErrorPopup = ({ error }: ErrorPopupProps): React.ReactElement | null => {
  if (!error) {
    return null;
  }

  return <div className='error-popup'>Error</div>;
};

export default ErrorPopup;

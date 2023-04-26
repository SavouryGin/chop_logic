import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffectOnce } from 'hooks';

const Portal = ({ children }: { children: React.ReactElement }): React.ReactPortal => {
  const [container] = useState(() => document.createElement('div'));

  useEffectOnce(() => {
    // Append a new portal at the end of the body element on mount
    document.body.appendChild(container);

    // Remove the portal on unmount
    return () => {
      document.body.removeChild(container);
    };
  });

  return ReactDOM.createPortal(children, container);
};

export default Portal;

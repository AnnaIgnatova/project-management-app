import { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  children: ReactElement;
};

const Portal = (props: PortalProps): React.ReactPortal => {
  const container = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(props.children, container);
};

export default Portal;

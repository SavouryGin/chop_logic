import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';

import './styles.scss';

export type FooterProps = {
  className?: string;
};

function Footer(props: FooterProps): React.ReactElement {
  return <footer className={formatClassName(['footer', props.className])}>Footer</footer>;
}

export default Footer;

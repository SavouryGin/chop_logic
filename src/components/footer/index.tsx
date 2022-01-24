import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';

import './styles.scss';

export type FooterProps = {
  className?: ClassNameProp;
};

function Footer(props: FooterProps): React.ReactElement {
  return <footer className={formatClassName(['footer', props.className])}>Footer</footer>;
}

export default Footer;

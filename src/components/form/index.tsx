import React, { useRef } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';

export type FormProps = {
  onSubmit: () => void;
  content: React.ReactElement;
  formRef?: React.MutableRefObject<HTMLFormElement | undefined>;
  action?: string;
  className?: ClassNameProp;
};

// ToDo: create a generic form
function Form(props: FormProps): React.ReactElement {
  const { action, className, onSubmit, content } = props;
  const formClassNames = formatClassName(['form', className]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    onSubmit();
  };

  return (
    <form className={formClassNames} action={action || '/'} onSubmit={handleSubmit}>
      {content}
    </form>
  );
}

export default Form;

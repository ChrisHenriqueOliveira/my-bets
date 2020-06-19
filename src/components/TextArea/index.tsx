import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<TextareaProps> = ({ name, icon: Icon, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(
    e => {
      setIsFocused(true);

      if (fieldName.includes('date')) {
        e.currentTarget.type = 'date';
      }
    },
    [fieldName],
  );

  const handleInputBlur = useCallback(
    e => {
      setIsFocused(false);

      if (fieldName.includes('date') && !e.currentTarget.value) {
        e.currentTarget.type = 'text';
      }
    },
    [fieldName],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <textarea
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={textareaRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default TextArea;

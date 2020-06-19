import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);
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
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={selectRef}
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
export default Select;

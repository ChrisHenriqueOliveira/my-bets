/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';

import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import { Container, ImagePreview } from './styles';

interface Props {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const ImageInput: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handleClick = useCallback(() => {
    document.getElementById('hiddenImagePetFileInput')?.click();
  }, []);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
    }

    try {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    } catch (ex) {
      setPreview(null);
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ImagePreview>
        {preview ? (
          <div
            className="withImageSelected"
            onClick={handleClick}
            role="button"
          >
            <img src={preview} alt="Preview" width="100" />
          </div>
        ) : (
          <div
            className="withoutImageSelected"
            onClick={handleClick}
            role="button"
          >
            {Icon && <Icon size={50} />}

            <button type="button">
              Clique para selecionar a imagem do pet
            </button>
          </div>
        )}
      </ImagePreview>

      <Container isErrored={!!error} style={{ display: 'none' }}>
        {Icon && <Icon size={20} />}
        <input
          type="file"
          ref={inputRef}
          onChange={handlePreview}
          id="hiddenImagePetFileInput"
          {...rest}
        />
      </Container>
    </>
  );
};

export default ImageInput;

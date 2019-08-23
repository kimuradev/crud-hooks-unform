import React, { useState } from 'react';

import Input from 'components/Input';
import Button from 'components/Button';

import Form from './Formik';

const getInitialState = props => {
  return {
    agencia: { value: '', isValid: false }
  };
};

const Example = props => {
  const [userData, setUserData] = useState(getInitialState(props), null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = event => {
    setUserData({
      ...userData,
      [event.name]: {
        value: event.value,
        isValid: event.valid
      }
    });
  };

  const onClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      <Input onChange={onChangeHandler} value={userData.agencia.value} />
      <Button isLoading={isLoading} onClick={onClick}>
        Button
      </Button>

      <Form />
    </>
  );
};

export default Example;

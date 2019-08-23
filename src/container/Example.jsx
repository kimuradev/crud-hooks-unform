import React, { useState } from 'react';

import Input from 'components/Input';

const getInitialState = props => {
  return {
    agencia: { value: '', isValid: false }
  };
};

const Example = props => {
  const [userData, setUserData] = useState(getInitialState(props), null);

  const onChangeHandler = event => {
    setUserData({
      ...userData,
      [event.name]: {
        value: event.value,
        isValid: event.valid
      }
    });
  };

  return (
    <>
      <Input onChange={onChangeHandler} value={userData.agencia.value} />
    </>
  );
};

export default Example;

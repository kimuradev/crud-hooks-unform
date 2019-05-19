import React, { useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

import * as Styled from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .min(4)
    .required('User name is required')
});

const CreateForm = props => {
  const initialFormState = { id: null, name: '', username: '', gender: '' };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    if (!user.name || !user.username) return;

    props.addUser(user);
    setUser(initialFormState);
  };

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Styled.LabelWrapper>
        <Styled.Label>Name</Styled.Label>
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </Styled.LabelWrapper>
      <Styled.LabelWrapper>
        <Styled.Label>Username</Styled.Label>
        <Input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </Styled.LabelWrapper>
      <Styled.LabelWrapper>
        <Styled.Label>Gender</Styled.Label>
        <Select
          name="gender"
          multiple
          onChange={handleInputChange}
          options={[{ id: '1', title: 'Male' }, { id: '2', title: 'Female' }]}
        />
      </Styled.LabelWrapper>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Form>
  );
};

export default CreateForm;

import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

import * as Styled from './styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .min(4)
    .required('User name is required')
});

const UpdateForm = props => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    props.updateUser(user.id, user);
  };

  const { classes } = props;

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Styled.LabelWrapper>
        <Styled.Label>Name</Styled.Label>
        <Input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <Styled.Label>Username</Styled.Label>
      </Styled.LabelWrapper>
      <Styled.LabelWrapper>
        <Input type="text" name="username" value={user.username} onChange={handleInputChange} />
      </Styled.LabelWrapper>
      <Button type="submit" variant="contained" color="primary" className={classes.button}>
        Update user
      </Button>
      <Button onClick={() => props.setEditing(false)} variant="contained" className={classes.button}>
        Cancel
      </Button>
    </Form>
  );
};

export default withStyles(styles)(UpdateForm);

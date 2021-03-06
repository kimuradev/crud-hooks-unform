import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import CreateForm from 'container/CreateForm';
import UpdateForm from 'container/UpdateForm';
import ReadForm from 'container/ReadForm';

import * as Styled from './styles';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

const App = props => {
  // Data
  const usersData = [
    { id: 1, name: 'Leandro', username: 'leandrokimura', gender: '1' },
    { id: 2, name: 'Kioshi', username: 'kioshikimura', gender: '2' },
    { id: 3, name: 'Kimura', username: 'kimura.leandro', gender: '1' }
  ];

  const initialFormState = { id: null, name: '', username: '' };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const editRow = user => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username,
      gender: user.gender
    });
  };

  const { classes } = props;

  return (
    <>
      <Styled.H1>C.R.U.D.</Styled.H1>
      <Styled.GridFlexRow>
        <Paper className={classes.paper}>
          {editing ? (
            <>
              <Styled.H2 color="#7159c1">Edit user</Styled.H2>
              <UpdateForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </>
          ) : (
            <>
              <Styled.H2 color="#7159c1">Add user</Styled.H2>
              <CreateForm addUser={addUser} />
            </>
          )}
        </Paper>

        <Paper className={classes.paper} style={{ background: '#7159c1' }}>
          <Styled.H2 color="#fff">View users</Styled.H2>
          <ReadForm users={users} editRow={editRow} deleteUser={deleteUser} />
        </Paper>
      </Styled.GridFlexRow>
    </>
  );
};

export default withStyles(styles)(App);

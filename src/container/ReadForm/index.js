import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const ReadForm = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">User name</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.length > 0 ? (
            props.users.map(user => (
              <TableRow key={user.id}>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">
                  {user.gender === '1' ? 'Male' : 'Female'}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      props.editRow(user);
                    }}
                    variant="contained"
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => props.deleteUser(user.id)}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Sorry, no users found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(ReadForm);

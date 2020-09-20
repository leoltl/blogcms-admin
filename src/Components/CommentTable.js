import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link, TablePagination } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
  row: {
    cursor: 'pointer',
  },
  icon: {
    opacity: 0.4,
  },
  good: {
    color: 'green',
    opacity: 0.4,
  }
});

export default function SimpleTable({ rows, handleClickOpen, handleChangePage, handleChangeRowsPerPage, rowsPerPage, page, count }) {
  const classes = useStyles();
  

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell></TableCell>
              <TableCell>Comment</TableCell>
              <TableCell align="right">In response to</TableCell>
              <TableCell align="right">Submitted on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow className={classes.row} key={row._id} onClick={() => handleClickOpen(row._id)}>
                <TableCell component="th" scope="row">
                  {row.commenter}
                </TableCell>
                <TableCell>
                  {row.published ? <CheckCircleOutlineIcon className={classes.good} /> : <HighlightOffIcon color="error" className={classes.icon}/>}
                </TableCell>
                <TableCell>
                {row.body}
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    <Link to={`/admin/posts/edit/${row.post._id}`} component={RouterLink}>
                      {row.post.title}
                    </Link>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {new Date(row.created_at).toDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

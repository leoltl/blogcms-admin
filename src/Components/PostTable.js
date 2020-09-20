import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography';

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

export default function SimpleTable({ rows, editPost, handleChangePage, handleChangeRowsPerPage, rowsPerPage, page, count}) {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow hover className={classes.row} key={row._id} onClick={editPost(row._id)}>
                <TableCell>
                  <Typography variant="body2">
                    {row.published 
                      ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlineIcon className={classes.good} />
                      </Tooltip>
                      ) : (
                      <Tooltip title="Unpublished">
                       <HighlightOffIcon color="error" className={classes.icon}/>
                      </Tooltip>
                      )
                    }
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.author.username}</TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {new Date(row.created_at).toLocaleString()}
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

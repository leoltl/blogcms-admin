import React, { useState } from 'react';

export default function Paginator({ component: Component, rows, ...rest}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || []

  return (
    <Component
      {...rest}
      rows={paginatedRows}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      count={rows?.length || 0}
      rowsPerPage={rowsPerPage}
      page={page}
    />
  )
}
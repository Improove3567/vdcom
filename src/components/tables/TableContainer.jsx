import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableWrapper from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

const TableContainer = ({
  Header,
  Body,
}) => {
  const render = () => {
    return (
      <>
        <TableHead sx={(theme) => ({ background: theme.palette.grey[100] })}>
          {Header}
        </TableHead>
        <TableBody>{Body}</TableBody>
      </>
    );
  };
  return (
    <TableWrapper component={Paper}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item alignSelf="right" paddingRight={2}>
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        {render()}
      </Table>
    </TableWrapper>
  );
};

export default TableContainer;

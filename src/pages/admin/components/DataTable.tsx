import * as React from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Box } from '@mui/system';
interface MyObject {
  [key: string]: string;
}
export default function DataTable({ data, source }: { data: MyObject[]; source: string | null }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columns, setColumns] = useState<never[] | string[]>([]);
  const [rows, setRows] = useState<never[] | any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (data.length > 0) {
      const filteredKeys = [];
      const filteredRows = [];
      for (const [key, value] of Object.entries(data[0])) {
        if (typeof value !== 'object' || value === null) {
          filteredKeys.push(key.toUpperCase());
        }
      }
      setColumns(filteredKeys.sort());
      for (const obj of data) {
        const sortedKeys = Object.keys(obj).sort();
        let sortedObj: MyObject = {};
        for (const key of sortedKeys) {
          sortedObj = { ...sortedObj, [key]: obj[key].toString() };
        }
        const row = [];
        for (const [key, value] of Object.entries(sortedObj)) {
          if (filteredKeys.includes(key.toUpperCase())) {
            if (key === 'id') {
              console.log(source);
              row.push(
                <TableCell key={value + Math.random()}>
                  <Link to={`${source ? source + '/' : ''}${value}`}>{value}</Link>
                </TableCell>
              );
            } else if (key === 'image') {
              row.push(
                <TableCell key={value + Math.random()}>
                  <img src={value} alt={value} style={{ width: '100px', height: '100px' }} />
                </TableCell>
              );
            } else {
              row.push(
                <TableCell key={value + Math.random()}>
                  {value.length > 50 ? value.substring(0, 50) + '...' : value}
                </TableCell>
              );
            }
          }
        }
        filteredRows.push(row);
      }

      setRows(filteredRows);
      setIsLoading(false);
    } else {
      setRows([]);
    }
    setIsLoading(false);
  }, [data, source]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} style={{ minWidth: 170 }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row + Math.random()}>
                  {rows[idx]}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

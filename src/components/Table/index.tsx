import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination, TableSortLabel, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { blue } from '@mui/material/colors';
import { Beer } from '../../types';

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none; 
  color: inherit; 
  &:hover {
    color: ${blue[500]};
  }
`;

interface Props {
    beerList: Beer[];
}

const BeerListTable: React.FC<Props> = ({ beerList }) => {
  const [data, setData] = useState<Beer[]>(beerList);
  const [filterText, setFilterText] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<keyof Beer | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };


  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.brewery_type.toLowerCase().includes(filterText.toLowerCase()) ||
    item.city.toLowerCase().includes(filterText.toLowerCase()) ||
    item.state.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleRequestSort = (property: keyof Beer) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isDataProperty = (obj: any, key: string): key is keyof Beer => {
    return key in obj;
  };

  const sortedData = orderBy ? filteredData.sort((a, b) => {
    if (!isDataProperty(a, orderBy) || !isDataProperty(b, orderBy)) return 0;
  
    const first = a[orderBy] ?? ''; // Use an empty string as fallback value
    const second = b[orderBy] ?? ''; // Use an empty string as fallback value
  
    if (first < second) return order === 'asc' ? -1 : 1;
    if (first > second) return order === 'asc' ? 1 : -1;
    return 0;
  }) : filteredData;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setData(beerList);
  }, [beerList]);

  useEffect(() => {
    // Filter the beer list based on the filter text
    const filteredData = beerList.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.brewery_type.toLowerCase().includes(filterText.toLowerCase()) ||
      item.city.toLowerCase().includes(filterText.toLowerCase()) ||
      item.state.toLowerCase().includes(filterText.toLowerCase())
    );
    // Update the data state with the filtered data
    setData(filteredData);
  }, [beerList, filterText]);

  return (
    <div>
      <TextField
        label="Filter"
        value={filterText}
        onChange={handleFilterChange}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'brewery_type'}
                direction={orderBy === 'brewery_type' ? order : 'asc'}
                onClick={() => handleRequestSort('brewery_type')}
              >
                Brewery Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'country'}
                direction={orderBy === 'country' ? order : 'asc'}
                onClick={() => handleRequestSort('country')}
              >
               Country
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'state'}
                direction={orderBy === 'state' ? order : 'asc'}
                onClick={() => handleRequestSort('brewery_type')}
              >
                State
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
            <TableRow key={item.id}>
                
              <TableCell> <StyledRouterLink to={`/beer/${item.id}`}>{item.name}</StyledRouterLink></TableCell>
              <TableCell>{item.brewery_type}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell>{item.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default BeerListTable;
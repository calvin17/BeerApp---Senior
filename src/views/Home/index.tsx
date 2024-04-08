import React, { useEffect, useState, useCallback } from 'react';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, IconButton, Paper, TextField, Link, Grid, Alert, Skeleton } from '@mui/material'; // Import Skeleton component
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Home.module.css';
import BeerCard from '../../components/Card';
import debounce from '../../utils/debounce';
import useFavoriteBeer from '../../hooks/useFavoriteBeer';
import useApi from '../../hooks/useApi';
import { ApiParams } from '../../types/apiCall';

export const StyledSavedBeer = styled(Paper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 400px;
    padding: 4px 8px;
    margin: 10px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
    }
`;

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredList, setFilteredList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState('');
  const { favorites, addFavorite, removeFavorite, clearFavorites } = useFavoriteBeer<Beer>('favoriteBeers', []);
  const { loading, error, makeApiCall } = useApi();

  useEffect(() => {
    setSavedList(favorites);
  }, [favorites]);

  const filterBeerList = (text: string) => {
    const filteredBeers = beerList.filter((beer) =>
      beer.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filteredBeers);
    setFilterText(text);
  };

  const debouncedFilterBeerList = debounce(filterBeerList, 100);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    debouncedFilterBeerList(text);
  };

  const fetchData = useCallback(async () => {
    try {
        const params: ApiParams = { size: 10 };
        const data = await makeApiCall(`breweries/random`, params) as Beer[];
        setBeerList(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, [makeApiCall]);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredList(beerList);
  }, [beerList]);

  const toggleFavorite = (beer: Beer) => {
    const index = savedList.findIndex((item) => item.id === beer.id);
    if (index === -1) {
      addFavorite(beer);
    } else {
      removeFavorite(index);
    }
  };

  const handleRemoveBeer = (index: number) => {
    removeFavorite(index);
  };

  const reloadList = () => {
    setFilterText('');
    fetchData();
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            {error &&
              <Alert variant="filled" severity="error">
                {error?.message}
              </Alert>
            }
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...'
                  variant='outlined'
                  value={filterText}
                  onChange={handleFilterChange}
                />
                <Button variant='contained' onClick={reloadList}>Reload list</Button>
              </div>
              <Grid container spacing={3} sx={{ p: 1 }}>
                {loading ? ( // Render Skeleton components while loading
                  Array.from({ length: 10 }).map((_, index) => ( 
                    <Grid item sm={12} md={4} key={index}>
                      <Skeleton variant="rectangular" height={150} />
                    </Grid>
                  ))
                ) : (
                  filteredList.map((beer, index) => (
                    <Grid item sm={12} md={4} key={beer.id}>
                      <Link component={RouterLink} to={`/beer/${beer.id}`}>
                        <BeerCard
                          beer={beer}
                          onFavoriteClick={() => toggleFavorite(beer)}
                          isFavorite={savedList.some(item => item.id === beer.id)}
                        />
                      </Link>
                    </Grid>
                  ))
                )}
              </Grid>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={clearFavorites}>
                  Remove all items
                </Button>
              </div>
              <div>
                {savedList.map((beer, index) => (
                  <StyledSavedBeer elevation={3} key={index.toString()}>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                    <IconButton onClick={() => handleRemoveBeer(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledSavedBeer>
                ))}
                {!savedList.length && <Alert severity="info">No saved items.</Alert>}
              </div>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;

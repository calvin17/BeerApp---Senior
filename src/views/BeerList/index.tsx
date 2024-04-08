import { useEffect, useState, useRef } from 'react';
import { Beer } from '../../types';
import { Box, Skeleton, Alert } from '@mui/material'; 
import BeerListTable from '../../components/Table';
import useApi from '../../hooks/useApi';
import { ApiParams } from '../../types/apiCall';

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const isDataFetched = useRef(false); 
  const { loading, error, makeApiCall } = useApi<Beer[]>(); 

  const params: ApiParams = {};

  useEffect(() => {
    if (!isDataFetched.current) { 
      const fetchData = async () => {
        try {
          const data = await makeApiCall(`breweries/`, params); 
          setBeerList(data);
          isDataFetched.current = true; 
        } catch (error) {
          console.error('Error fetching beer:', error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          {error &&
            <Alert variant="filled" severity="error">
              {error?.message}
            </Alert>
          }
          {loading ? ( // Render Skeleton if loading
            <Box
              sx={{
                height: "max-content",
                mt: 8
              }}
            >
              {[...Array(5)].map((_) => (
                <Skeleton variant="rectangular" sx={{ my: 3, mx: 1 }} />
              ))}
            </Box>
          ) : (
            <BeerListTable beerList={beerList} />
          )}
        </main>
      </section>
    </article>
  );
};

export default BeerList;

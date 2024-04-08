import React, { useEffect, useState, useRef } from 'react';
import { Beer as IBeer } from '../../types';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Link, Skeleton, Alert } from '@mui/material'; // Import Skeleton component
import styled from '@emotion/styled';
import useApi from '../../hooks/useApi';

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const FullWidthGrid = styled(Grid)`
  width: 100%;
`;

const FullWidthContainer = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
`;

const Beer = () => {
  const { id } = useParams();

  const [beer, setBeer] = useState<IBeer>();

  const { loading, error, makeApiCall } = useApi<IBeer>();

  const idRef = useRef<string | null>(id ?? null); // Initialize idRef with the current value of id or null

  useEffect(() => {
    if (id !== undefined) {
      idRef.current = id; // Update idRef with the current value of id
    }
  }, [id]);

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        if (idRef.current) { 
          const data = await makeApiCall(`breweries/${idRef.current}`);
          setBeer(data);
        }
      } catch (error) {
        console.error('Error fetching beer:', error);
      }
    };
  
    fetchBeer();
  }, []);

  return (
    <FullWidthContainer>
      <FullWidthGrid container spacing={3} justifyContent="center" alignItems="center">
        {error &&
              <Grid item xs={8}>
                <Alert variant="filled" severity="error">
                  {error?.message}
                </Alert>
              </Grid>
        }
        <Grid item xs={8}>
          <StyledPaper style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            {loading ? ( // Render Skeleton components while loading
              <Skeleton variant="text" width="50%" />
            ) : (
              <>
                <Typography variant="h4">{beer?.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{beer?.brewery_type}</Typography>
              </>
            )}
          </StyledPaper>
        </Grid>
        <Grid item xs={8}>
          <StyledPaper style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            {loading ? ( // Render Skeleton components while loading
              <>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </>
            ) : (
              <>
                <Typography variant="body1">
                  <b>Address:</b> {beer?.address_1}, {beer?.address_2}, {beer?.address_3}, {beer?.city}, {beer?.state_province}, {beer?.postal_code}, {beer?.country}
                </Typography>
                <Typography variant="body1">
                  <b>Location:</b> Latitude: {beer?.latitude}, Longitude: {beer?.longitude}
                </Typography>
                <Typography variant="body1">
                  <b>Phone:</b> {beer?.phone}
                </Typography>
                <Typography variant="body1">
                  <b>Website:</b> <Link href={beer?.website_url} target="_blank" rel="noopener noreferrer">{beer?.website_url}</Link>
                </Typography>
              </>
            )}
          </StyledPaper>
        </Grid>
      </FullWidthGrid>
    </FullWidthContainer>
  );
};

export default React.memo(Beer);

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';
import { Beer } from '../../types/beer';
import { blue } from '@mui/material/colors';

export const StyledCard = styled(Card)`
    height: 180px;
    max-width: 345px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 2px 10px rgba(33, 150, 243, 0.5);
    }
`;

const StyledLink = styled.a`
    text-decoration: none;
    color: ${blue[500]};
    &:hover {
        text-decoration: underline;
    }
`;

interface BeerCardProps {
    beer: Beer;
    onFavoriteClick: (beer: Beer) => void;
    isFavorite: boolean; // Add isFavorite prop
}

const BeerCard: React.FC<BeerCardProps> = ({ beer, onFavoriteClick, isFavorite }) => {
    const { name, country, website_url, brewery_type } = beer;

    const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onFavoriteClick(beer);
    };

    const handleWebsiteClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        window.open(website_url, '_blank');
    };

    return (
        <StyledCard sx={{ maxWidth: 345 }}>
            <CardHeader
                title={name}
                titleTypographyProps={{ variant: 'h6' }}
                sx={{ pb: 0 }}
                action={
                    <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
                        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Brewery Type: {brewery_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Country: {country}
                </Typography>
                {
                    website_url && (
                        <Typography variant="body2" color="text.secondary">
                            Website url: <StyledLink href={website_url} onClick={handleWebsiteClick} target="_blank" rel="noopener noreferrer">{website_url}</StyledLink>
                        </Typography>
                    )
                }
            </CardContent>
        </StyledCard>
    );
}

export default BeerCard;

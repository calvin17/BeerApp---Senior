import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BeerCard from './index';
import { Beer } from '../../types/beer';

describe('BeerCard component', () => {
  // Mock beer data
  const mockBeer: Beer = {
    id: "1",
    name: "Ivory Tower Brewery",
    city: "Boone",
    state_province: "North Carolina",
    postal_code: "12345",
    country: "United States",
    website_url: "http://ivorytowerscience.com",
    brewery_type: "planning",
    longitude: "123.456", 
    latitude: "45.678", 
    phone: "123-456-7890", 
    state: "North Carolina", 
    street: "123 Sample St" 
  };

  test('renders beer card with correct content', () => {
    // Render BeerCard component with mock data
    render(<BeerCard beer={mockBeer} onFavoriteClick={() => {}} isFavorite={false} />);

    // Assert that the brewery type is rendered
    expect(screen.getByText('Ivory Tower Brewery')).toBeInTheDocument();

    // Assert that the country is rendered
    expect(screen.getByText('Country: United States')).toBeInTheDocument();

  });

  test('handles favorite button click', () => {
    // Mock function for onFavoriteClick
    const mockOnFavoriteClick = jest.fn();

    // Render BeerCard component with mock data and mock function
    render(<BeerCard beer={mockBeer} onFavoriteClick={mockOnFavoriteClick} isFavorite={false} />);

    // Click on the favorite button
    fireEvent.click(screen.getByLabelText('favorite'));

    // Assert that the onFavoriteClick function is called with the mock beer data
    expect(mockOnFavoriteClick).toHaveBeenCalledWith(mockBeer);
  });
});

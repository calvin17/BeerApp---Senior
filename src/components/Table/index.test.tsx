import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BeerListTable from './index';
import { Beer } from '../../types';
import { BrowserRouter } from 'react-router-dom';

// Mock beer data
const mockBeerList: Beer[] = [
    {
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
    },
    {
        id: '2',
        brewery_type: "brewpub",
        city: "Vista",
        country: "United States",
        latitude: "33.148212",
        longitude: "-117.218025",
        name: "Booze Brothers Brewing Co.",
        phone: "7602950217",
        postal_code: "92081-8483",
        state: "California",
        state_province: "California",
        street: "2545 Progress St",
        website_url: "http://www.boozebrothersbrewery.com",
    },
];

describe('BeerListTable component', () => {
  test('renders beer list table with correct content', () => {
    render(<BrowserRouter><BeerListTable beerList={mockBeerList} /></BrowserRouter>);
    
    // Assert that beer names are rendered
    expect(screen.getByText('Ivory Tower Brewery')).toBeInTheDocument();
    expect(screen.getByText('Booze Brothers Brewing Co.')).toBeInTheDocument();
    
    // Assert that brewery types are rendered
    expect(screen.getByText('planning')).toBeInTheDocument();
    expect(screen.getByText('brewpub')).toBeInTheDocument();
    
    // Assert that states are rendered
    expect(screen.getByText('North Carolina')).toBeInTheDocument();
    expect(screen.getByText('California')).toBeInTheDocument();
  });

  test('filters beer list based on input', () => {
    render(<BrowserRouter><BeerListTable beerList={mockBeerList} /></BrowserRouter>);
    
    // Enter filter text in the input field
    fireEvent.change(screen.getByLabelText('Filter'), { target: { value: 'Ivory Tower Brewery' } });
    
    // Assert that only Ivory Tower Brewery is displayed in the table
    expect(screen.getByText('Ivory Tower Brewery')).toBeInTheDocument();
    expect(screen.queryByText('Booze Brothers Brewing Co.')).not.toBeInTheDocument();
  });
});

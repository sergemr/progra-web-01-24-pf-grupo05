import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Libros from './Libros';

describe('<Libros />', () => {
  test('it should mount', () => {
    render(<Libros />);
    
    const libros = screen.getByTestId('Libros');

    expect(libros).toBeInTheDocument();
  });
});
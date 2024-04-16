import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Consulta from './Consulta';

describe('<Consulta />', () => {
  test('it should mount', () => {
    render(<Consulta />);
    
    const consulta = screen.getByTestId('Consulta');

    expect(consulta).toBeInTheDocument();
  });
});
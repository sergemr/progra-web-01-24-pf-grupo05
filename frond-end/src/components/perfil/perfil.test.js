import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Perfil from './Perfil';

describe('<Perfil />', () => {
  test('it should mount', () => {
    render(<Perfil />);
    
    const perfil = screen.getByTestId('Perfil');

    expect(perfil).toBeInTheDocument();
  });
});
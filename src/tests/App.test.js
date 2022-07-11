import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

const mockStarWars = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
};

describe('Desenvolva testes para cobrir 50% do projeto', () => {
  beforeEach(mockStarWars);

  afterEach(() => jest.clearAllMocks());

  test('Testa se a tabela tem 13 colunas', async () => {
    render(<App />);
    const columnHeader = await screen.findByTestId('column-header');
    expect(columnHeader.children.length).toBe(13);
  });

  test('Testa se a qt de planetas é igual à 10', async () => {
    render(<App />);
    const planets = await screen.findAllByTestId('planets');
    expect(planets.length).toBe(10);
  })

  test('Testa se escreve "Tatooine" no input, ele filtra para apenas um planeta', async () => {
    render(<App />);
    const inputFilterText = await screen.findByTestId('name-filter');
    expect(inputFilterText).toBeInTheDocument();
    userEvent.type(inputFilterText, 'Tatooine');
    const planets = screen.getAllByTestId('planets');
    expect(planets.length).toBe(1);
  })
})
// doc: https://cathalmacdonnacha.com/how-to-test-a-select-element-with-react-testing-library

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  it('verifica se "busque por texto" está na tela', () => {
      render(<App />);
      const headingFilter = screen.getByText(/Busque por texto/i);

      expect(headingFilter).toBeInTheDocument();
  });

  it('verifica se existe um input de texto na tela', () => {
      render(<App />);
      const inputName = screen.getByTestId("name-filter");

      expect(inputName).toBeInTheDocument();
  });

  it('verifica se existe o componente <tr> do cabeçalho da tabela', async () => {
      render(<App />);
      const firstPlanet = await screen.findByTestId('Tatooine');

      expect(firstPlanet).toBeInTheDocument();
  });

  it('verifica se é possível escrever no input', () => {
      render(<App />);
      userEvent.type(screen.getByRole('textbox'), 'oo');

      expect(screen.getByRole('textbox')).toHaveValue('oo');
  });

  it('verifica se é ao escrever no input, a lista é filtrada', async () => {
      render(<App />);
      userEvent.type(screen.getByRole('textbox'), 'oo');

      const result1 = await screen.findByText(/tatooine/i);
      const result2 = await screen.findByText(/naboo/i);

      expect(result1).toBeInTheDocument();
      expect(result2).toBeInTheDocument();
  });


  it('verifica se o campo de filtragem', () => {
      render(<App />);
      const population = screen.getByText('population');
      const maiorQue = screen.getByText('maior que');
      expect(population).toBeInTheDocument();
      expect(maiorQue).toBeInTheDocument();
  });

  it('Testa seletor de comparação: caso Maior que', async () => {
      render(<App />);
      userEvent.selectOptions(screen.getByTestId("column-filter"), screen.getByRole('option', { name: 'diameter' }))

      userEvent.selectOptions(screen.getByTestId("comparison-filter"), screen.getByRole('option', { name: 'maior que' }))

      const inputNumber =  screen.getByTestId("value-filter");
      expect(inputNumber).toHaveAttribute("type", "number");

      userEvent.type(inputNumber, "20000");

      userEvent.click(screen.getByRole('button', {  name: /Adicionar filtro/i}));

      const resultFilter = await screen.findAllByRole('cell');
      expect(resultFilter).toHaveLength(13);
  });

  it('Testa seletor de comparação: caso Menor que', async () => {
      render(<App />);

      userEvent.selectOptions(screen.getByTestId("column-filter"), screen.getByRole('option', { name: 'diameter' }))

      userEvent.selectOptions(screen.getByTestId("comparison-filter"), screen.getByRole('option', { name: 'menor que' }))

      const inputNumber =  screen.getByTestId("value-filter");
      expect(inputNumber).toHaveAttribute("type", "number");

      userEvent.type(inputNumber, "5000");

      userEvent.click(screen.getByRole('button', {  name: /Adicionar filtro/i}));

      const resultFilter = await screen.findAllByRole('cell'); 
      expect(resultFilter).toHaveLength(13);
  });

  it('Testa seletor de comparação: caso Igual a', async () => {
      render(<App />);
      
      userEvent.selectOptions(screen.getByTestId("column-filter"), screen.getByRole('option', { name: 'diameter' }))
      
      userEvent.selectOptions(screen.getByTestId("comparison-filter"), screen.getByRole('option', { name: 'igual a' }))
      
      const inputNumber =  screen.getByTestId("value-filter");
      expect(inputNumber).toHaveAttribute("type", "number");

      userEvent.type(inputNumber, "12500");
      userEvent.click(screen.getByRole('button', {  name: /Adicionar filtro/i}));

      const resultFilter = await screen.findAllByRole('cell');
      expect(resultFilter).toHaveLength(13);
  });
});

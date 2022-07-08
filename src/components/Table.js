// doc: https://www.homehost.com.br/blog/criar-sites/tabela-html/
import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  const [filterByName, setFilterByName] = useState('');
  const [nameInput, setNameInput] = useState([]);

  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [inputColumn, setInputColumn] = useState('population');
  const [inputCompar, setInputCompar] = useState('maior que');
  const [inputNumb, setInputNumb] = useState('0');

  function handleColumn({ target: { value } }) {
    setInputColumn(value);
  }

  function handleCompar({ target: { value } }) {
    setInputCompar(value);
  }

  function handleNumber({ target: { value } }) {
    setInputNumb(value);
  }

  function handleFilterValue(event) {
    event.preventDefault();
    if (inputCompar === 'maior que') {
      const filteredData = data
        .filter((planet) => Number(planet[inputColumn]) > Number(inputNumb));
      setFilteredByCategory(filteredData);
    } else if (inputCompar === 'menor que') {
      const filteredData = data
        .filter((planet) => Number(planet[inputColumn]) < Number(inputNumb));
      setFilteredByCategory(filteredData);
    } else if (inputCompar === 'igual a') {
      const filteredData = data
        .filter((planet) => Number(planet[inputColumn]) === Number(inputNumb));
      setFilteredByCategory(filteredData);
    }
  }

  const handleChange = ({ target: { value } }) => {
    setNameInput(value);
    if (value !== '') {
      const filter = data.filter((p) => p.name
        .toLowerCase().includes(value.toLowerCase()));
      return setFilterByName(filter);
    }
    return setFilterByName([]);
  };

  return (
    <>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          type="text"
          id="name-filter"
          value={ nameInput }
          onChange={ handleChange }
        />
      </label>
      <form>
        <label htmlFor="select-category">
          Column:
          <select
            id="select-category"
            data-testid="column-filter"
            onChange={ handleColumn }
            value={ inputColumn }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="select-operator">
          Comparison
          <select
            id="select-operator"
            data-testid="comparison-filter"
            value={ inputCompar }
            onChange={ handleCompar }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="input-number">
          <input
            type="number"
            id="input-number"
            data-testid="value-filter"
            value={ inputNumb }
            onChange={ handleNumber }
          />
        </label>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ handleFilterValue }
        >
          Adicionar filtro
        </button>
      </form>
      <table>
        <thead>
          <tr>
            { data.length && Object.keys(data[0])
              .map((title) => <th key={ title }>{title}</th>)}
          </tr>
        </thead>
        { filteredByCategory[0]
          ? (
            <tbody>
              {
                filteredByCategory.map((planetByCategory) => (
                  <tr key={ planetByCategory.name }>
                    <td>{ planetByCategory.name }</td>
                    <td>{ planetByCategory.rotation_period }</td>
                    <td>{ planetByCategory.orbital_period }</td>
                    <td>{ planetByCategory.diameter }</td>
                    <td>{ planetByCategory.climate }</td>
                    <td>{ planetByCategory.gravity }</td>
                    <td>{ planetByCategory.terrain }</td>
                    <td>{ planetByCategory.surface_water }</td>
                    <td>{ planetByCategory.population }</td>
                    <td>{ planetByCategory.films }</td>
                    <td>{ planetByCategory.created }</td>
                    <td>{ planetByCategory.edited }</td>
                    <td>{ planetByCategory.url }</td>
                  </tr>
                ))
              }
            </tbody>
          ) : (
            <tbody>
              { filterByName[0]
                ? (
                  filterByName.map((planetFiltered) => (
                    <tr key={ planetFiltered.name }>
                      <td>{ planetFiltered.name }</td>
                      <td>{ planetFiltered.rotation_period }</td>
                      <td>{ planetFiltered.orbital_period }</td>
                      <td>{ planetFiltered.diameter }</td>
                      <td>{ planetFiltered.climate }</td>
                      <td>{ planetFiltered.gravity }</td>
                      <td>{ planetFiltered.terrain }</td>
                      <td>{ planetFiltered.surface_water }</td>
                      <td>{ planetFiltered.population }</td>
                      <td>{ planetFiltered.films }</td>
                      <td>{ planetFiltered.created }</td>
                      <td>{ planetFiltered.edited }</td>
                      <td>{ planetFiltered.url }</td>
                    </tr>
                  ))
                ) : (
                  data.map((planet) => (
                    <tr key={ planet.name }>
                      <td>{ planet.name }</td>
                      <td>{ planet.rotation_period }</td>
                      <td>{ planet.orbital_period }</td>
                      <td>{ planet.diameter }</td>
                      <td>{ planet.climate }</td>
                      <td>{ planet.gravity }</td>
                      <td>{ planet.terrain }</td>
                      <td>{ planet.surface_water }</td>
                      <td>{ planet.population }</td>
                      <td>{ planet.films }</td>
                      <td>{ planet.created }</td>
                      <td>{ planet.edited }</td>
                      <td>{ planet.url }</td>
                    </tr>
                  ))
                ) }
            </tbody>
          ) }
      </table>
    </>
  );
}

export default Table;

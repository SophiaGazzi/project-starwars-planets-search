// doc: https://www.homehost.com.br/blog/criar-sites/tabela-html/
import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';

const inicialState = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function Table() {
  const { data } = useContext(MyContext);
  const [filterByName, setFilterByName] = useState('');
  const [nameInput, setNameInput] = useState([]);

  /* const ESTADO = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  }; */

  const [newComparison, setNewComparison] = useState(inicialState);

  const [filteredByCategory,
    setFilteredByCategory] = useState([]);
  const [inputColumn, setInputColumn] = useState('population');
  const [inputCompar, setInputCompar] = useState('maior que');
  const [inputNumb, setInputNumb] = useState(0);
  const [filterPlanetas, setFilterPlanetas] = useState(data);

  const newRenderC = () => {
    const arrayNovo = filteredByCategory.reduce((acc, cat) => {
      acc = acc.filter((el) => cat.column !== el);
      return acc;
    }, [...inicialState]);
    setNewComparison(arrayNovo);
  };

  useEffect(() => {
    newRenderC();
  }, [filterPlanetas]);

  useEffect(() => {
    const handleFilterValue = () => {
      const array = filteredByCategory.reduce((acc, filtro) => {
        if (filtro.comparison === 'maior que') {
          acc = acc
            .filter((planet) => Number(planet[filtro.column]) > Number(filtro.value));
        }
        if (filtro.comparison === 'menor que') {
          acc = acc
            .filter((planet) => Number(planet[filtro.column]) < Number(filtro.value));
        }
        if (filtro.comparison === 'igual a') {
          acc = acc
            .filter((planet) => Number(planet[filtro.column]) === Number(filtro.value));
        }
        return acc;
      }, [...data]);
      setFilterPlanetas(array);
    };
    handleFilterValue();
    setInputColumn('population');
    setInputCompar('maior que');
    setInputNumb(0);
  }, [filteredByCategory]);

  const handleSetFilter = () => {
    setFilteredByCategory(
      [...filteredByCategory, { column: inputColumn,
        comparison: inputCompar,
        value: inputNumb }],
    );
  };

  const handleChange = ({ target: { value } }) => {
    setNameInput(value);
    if (value !== '') {
      const filter = data.filter((p) => p.name
        .toLowerCase().includes(value.toLowerCase()));
      return setFilterByName(filter);
    }
    return setFilterByName('');
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
            value={ inputColumn }
            onChange={ ({ target }) => setInputColumn(target.value) }
          >
            {
              newComparison
                .map((el) => (
                  <option value={ el } key={ el }>
                    {el}
                  </option>
                ))
            }
          </select>
        </label>
        <label htmlFor="select-operator">
          Comparison
          <select
            id="select-operator"
            data-testid="comparison-filter"
            value={ inputCompar }
            onChange={ ({ target }) => setInputCompar(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="input-number">
          <input
            type="number"
            id="input-number"
            value={ inputNumb }
            data-testid="value-filter"
            onChange={ ({ target }) => setInputNumb(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSetFilter }
        >
          Adicionar filtro
        </button>
      </form>
      <table>
        <thead>
          <tr data-testid="column-header">
            { data.length && Object.keys(data[0])
              .map((title) => <th key={ title }>{title}</th>)}
          </tr>
        </thead>
        { filterPlanetas[0]
          ? (
            <tbody>
              {
                filterPlanetas.map((planetByCategory, index) => (
                  <tr key={ index }>
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

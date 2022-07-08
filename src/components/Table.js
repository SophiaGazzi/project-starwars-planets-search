// doc: https://www.homehost.com.br/blog/criar-sites/tabela-html/
import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { data } = useContext(MyContext);
  const [filterByName, setFilterByName] = useState('');
  const [nameInput, setNameInput] = useState([]);

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
    <div>
      <input
        data-testid="name-filter"
        value={ nameInput }
        name="filter"
        placeholder="pesquisar"
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            { data.length && Object.keys(data[0])
              .map((title) => <th key={ title }>{title}</th>)}
          </tr>
        </thead>
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
      </table>
    </div>
  );
}

export default Table;

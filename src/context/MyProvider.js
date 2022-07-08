// doc: https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [data, setData] = useState([]);

  useEffect(() => {
    const getFetchAPIfetch = async () => {
      const { results } = await fetch(url)
        .then((response) => response.json());
      results.forEach((r) => delete r.residents);
      setData(results);
    };
    getFetchAPIfetch();
  }, []);

  return (
    <MyContext.Provider value={ { data } }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;

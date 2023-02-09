'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';

export const DataContext = createContext({
  data: undefined,
  setData: () => {},
});

export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children, data }) => {
  const [samples, setSamples] = useState([]);
  const [units, setUnits] = useState([]);
  const [sources, setSources] = useState([]);

  const getData = async () => {
    return 'test';
    // const res = await fetch(
    //   'https://pluspool-east-river-data.s3.us-east-2.amazonaws.com/2020-04-30T00%3A00%3A46.330Z.json',
    //   {
    //     method: 'GET',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept-Encoding': 'gzip',
    //     },
    //   }
    // );

    // return res.json();
  };

  useInterval(async () => {
    console.log('Test');
    // const data = await getData();

    // console.log(data);

    // if (data) {
    //   console.log(data);
    //   setSamples(data.samples);
    //   setUnits(data.units);
    //   setSources(data.sources);
    // }
  }, 6000);

  return (
    <DataContext.Provider
      value={{
        samples,
        setSamples,
        units,
        setUnits,
        sources,
        setSources,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

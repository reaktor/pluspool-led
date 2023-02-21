'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useInterval } from '../hooks/useInterval';
import { getData } from '../helpers/dataLoader';

export const DataContext = createContext({
  data: undefined,
  setData: () => {},
});

export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children, data }) => {
  const [samples, setSamples] = useState(data.samples);
  const [units, setUnits] = useState(data.units);
  const [sources, setSources] = useState(data.sources);

  const fetchData = useCallback(async () => {
    const newData = await getData();

    if (newData) {
      setSamples(newData.samples);
      setUnits(newData.units);
      setSources(newData.sources);
    }
  }, [setSamples, setUnits, setSources]);

  useInterval(fetchData, 600000);

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

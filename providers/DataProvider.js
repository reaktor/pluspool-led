'use client';

import React, { createContext, useContext, useState } from 'react';

export const DataContext = createContext({
  data: undefined,
  setData: () => {},
});

export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children, data }) => {
  const [samples, setSamples] = useState(data.samples);
  const [units, setUnits] = useState(data.units);
  const [sources, setSources] = useState(data.sources);

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

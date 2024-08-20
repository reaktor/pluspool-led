// YSI returns -99.9 instead of null for invalid samples
const isInvalidSample = (sample) => {
  const invalidValues = {
    temperature: -99.9,
    chlorophyll: -99.9,
    ph: -99.9,
    salinity: -99.9,
    turbidity: -99.9,
    depth: -99.9,
    oxygen: -99.9,
  };

  return Object.keys(invalidValues).some(
    (key) => sample[key] === invalidValues[key]
  );
};

export const removeInvalidSamples = (data) => {
  if (!data || !Array.isArray(data.samples)) {
    return [];
  }

  return {
    ...data,
    samples: data.samples.filter((sample) => !isInvalidSample(sample)),
  };
};

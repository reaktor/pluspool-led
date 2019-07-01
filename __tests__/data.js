import { getSamples } from '../helpers/data'

const stationData = {
  'name': 'HOBO Weather Station - SN 8388608',
  'timezone': 'UTC-300 minutes',
  'header': [
    'Date_Time',
    'Pressure_10096011_mbar',
    'Water Temperature_SDI_0_2_F',
    'Sp Cond_SDI_0_3_mS/cm',
    'Salinity_SDI_0_4_ppt',
    'Depth_SDI_0_5_m',
    'pH_SDI_0_6_H+',
    'pH mV_SDI_0_7_V',
    'Turbidity_SDI_0_8_NTU',
    'Chl_SDI_0_9_ug/L',
    'Percent Oxygen_SDI_0_10_%',
    'Concentration Oxygen_SDI_0_11_mg/L',
    'Battery_SDI_0_12_volts',
    'Corrected Depth_SDI_0_12_m'
  ],
  'samples': [
    [1562000400000, 1020, 73.75, 11, 6.25, 2.162, 7.13, -52.8, 10, 3.9, 70, 5.77, 11.1, 2.09], // Mon Jul 01 2019 13:00:00
    [1562001300000, 1020, 73.75, 11, 6.25, 2.162, 7.13, -52.8, 10, 3.9, 70, 5.77, 11.1, 2.09], // Mon Jul 01 2019 13:15:00
    [1562002200000, 1021, 73.75, 11, 6.25, 2.162, 7.13, -52.8, 10, 3.9, 70, 5.77, 11.1, 2.09], // Mon Jul 01 2019 13:30:00
    [1562003100000, 1022, 73.75, 11, 6.25, 2.162, 7.13, -52.8, 10, 3.9, 70, 5.77, 11.1, 2.09], // Mon Jul 01 2019 13:45:00
    []
  ]
}

const noaaData = [
  {
    t: '2019-07-01 13:00',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:06',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:12',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:18',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:24',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:30',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:36',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:42',
    s: '1.065',
    d: '150',
    b: '11'
  },
  {
    t: '2019-07-01 13:48',
    s: '0.987',
    d: '153',
    b: '11'
  },
  {
    t: '2019-07-01 13:54',
    s: '0.881',
    d: '158',
    b: '11'
  },
  {
    t: '2019-07-01 14:00',
    s: '0.814',
    d: '162',
    b: '11'
  }
]

it('gets data', () => {
  const samples = getSamples({ noaaData, stationData })
  const firstSample = samples[0]
  const lastSample = samples[samples.length - 1]

  samples.map(sample => {
    console.log(new Date(sample['Date_Time']), new Date(sample.t))
  })

  // check timestamp of first sample
  // expect(firstSample).toEqual(
  //   expect.objectContaining({
  //     t: '2019-07-01 13:30',
  //     Date_Time: 1562001300000
  //   })
  // )

  // // check timestamp of last sample
  // expect(lastSample).toEqual(
  //   expect.objectContaining({
  //     t: '2019-07-01 13:42',
  //     Date_Time: 1562002200000
  //   })
  // )

  // check length
  expect(samples.length).toBe(8)
})

import { DIRECTIONS } from '../helpers/constants'

export default {
  bacteria: {
    slug: 'bacteria',
    color: '#F2BAD2',
    label: 'Pathogens',
    interperet: value => {
      if (value < 35) return 'Good'
      if (value < 104) return 'Bad'
      return 'Ugly'
    },
    legend: [
      {
        value: 0,
        label: 'Good'
      },
      {
        value: 35,
        label: 'Bad'
      },
      {
        value: 104,
        label: 'Ugly'
      }
    ]
  },
  oxygen: {
    slug: 'oxygen',
    color: '#1443A7',
    label: 'Oxygen',
    interperet: () => 'Normal',
    legend: [
      {
        value: '0%'
      },
      {
        value: '100%'
      }
    ]
  },
  temperature: {
    slug: 'temperature',
    color: '#DB2B2B',
    label: 'Temperature',
    interperet: (value) => {
      if (value < 47) return 'Hypothermia'
      if (value < 60) return 'Chilly'
      if (value < 71) return 'Cool'
      return 'Warm'
    },
    legend: [
      {
        value: 32,
        label: 'Hypothermia'
      },
      {
        value: 47,
        label: 'Chilly'
      },
      {
        value: 60,
        label: 'Cool'
      },
      {
        value: 71,
        label: 'Warm'
      }
    ]
  },
  salinity: {
    slug: 'salinity',
    color: '#009247',
    label: 'Salinity',
    interperet: value => {
      if (value < 10) return 'Salty'
      return 'Stings'
    },
    legend: [
      {
        value: 0,
        label: 'Salty'
      },
      {
        value: 10,
        label: 'Stings'
      }
    ]
  },
  turbidity: {
    slug: 'turbidity',
    color: '#0DB3A6',
    label: 'Clarity',
    interperet: value => {
      if (value < 20) return 'Clear'
      if (value < 75) return 'Cloudy'
      return 'Murky'
    },
    legend: [
      { value: 0,
        label: 'Clear'
      },
      { value: 20,
        label: 'Cloudy'
      },
      { value: 75,
        label: 'Murky'
      }
    ]
  },
  speed: {
    slug: 'speed',
    color: '#000000',
    label: 'Speed',
    interperet: value => {
      if (value < 0.5) return 'Still'
      if (value < 1) return 'Moving'
      return 'Fast'
    },
    legend: [
      {
        value: 0,
        label: 'Still'
      },
      {
        value: 0.5,
        label: 'Moving'
      },
      {
        value: 1.5,
        label: 'Fast'
      }
    ]
  },
  direction: {
    slug: 'direction',
    color: '#E28224',
    label: 'Direction',
    interperet: value => DIRECTIONS[Math.floor(value / 45)]
  },
  ph: {
    slug: 'ph',
    color: '#592150',
    label: 'pH',
    interperet: value => {
      if (value < 6) return 'Acidic'
      if (value > 7) return 'Basic'
      return 'Neutral'
    },
    max: 14,
    legend: [
      {
        value: 0,
        label: 'Acidic'
      },
      {
        value: 6,
        label: 'Neutral'
      },
      {
        value: 7,
        label: 'Basic'
      }
    ]
  },
  depth: {
    slug: 'depth',
    color: '#FFD746',
    label: 'Tide',
    interperet: value => {
      if (value < 3.2) return 'Low'
      return 'High'
    },
    legend: [
      {
        value: 0,
        label: 'Low'
      },
      {
        value: 3.2,
        label: 'High'
      }
    ]
  }
}

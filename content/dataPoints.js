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
    ],
    disclaimerText: 'Since this is the main parameter the Health Department tracks when determining whether a body of water is safe for swimming, it is the only parameter we use to track whether the water is great (or not so great) for swimming. Of course all the other parameters listed here (like temperature!) impact your swimming experience!',
    showNumber: false
  },
  oxygen: {
    slug: 'oxygen',
    color: '#1443A7',
    label: 'Oxygen',
    interperet: value => {
      if (value < 5) return 'Low'
      if (value < 6) return 'Normal'
      return 'High'
    },
    legend: [
      {
        value: '<5',
        label: 'Low'
      },
      {
        value: 5,
        label: 'Normal'
      },
      {
        value: 5,
        label: 'High'
      }
    ]
  },
  temperature: {
    slug: 'temperature',
    color: '#DB2B2B',
    label: 'Temperature',
    interperet: (value) => {
      if (value < 47) return 'Hypothermia'
      if (value < 61) return 'Chilly'
      if (value < 72) return 'Cool'
      return 'Warm'
    },
    legend: [
      {
        value: '<32',
        label: 'Hypothermia'
      },
      {
        value: 47,
        label: 'Chilly'
      },
      {
        value: 61,
        label: 'Cool'
      },
      {
        value: 72,
        label: 'Warm'
      }
    ],
    disclaimerText: 'Temperature is not factored into our real-time algorithm for swimming. So while the water quality may be safe for swimming, the temperature may not be. Different strokes for different folks!'
  },
  salinity: {
    slug: 'salinity',
    color: '#009247',
    label: 'Salinity',
    interperet: value => {
      if (value < 0.5) return 'Fresh'
      if (value < 30) return 'Brackish'
      return 'Salty'
    },
    legend: [
      {
        value: 0,
        label: 'Fresh'
      },
      {
        value: 0.5,
        label: 'Brackish'
      },
      {
        value: 30,
        label: 'Salty'
      }
    ]
  },
  turbidity: {
    slug: 'turbidity',
    color: '#0DB3A6',
    label: 'Clarity',
    interperet: value => {
      if (value < 21) return 'Clear'
      if (value < 75) return 'Cloudy'
      return 'Murky'
    },
    legend: [
      {
        value: '<20',
        label: 'Clear'
      },
      {
        value: 21,
        label: 'Cloudy'
      },
      {
        value: 75,
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
    ],
    disclaimerText: 'Margin of error note: We’re tracking speed from The Narrows because it is the closest Weather Station to Pier 17.',
    showNumber: false
  },
  direction: {
    slug: 'direction',
    color: '#E28224',
    label: 'Direction',
    interperet: value => DIRECTIONS[Math.floor(value / 45)],
    showNumber: false
  },
  ph: {
    slug: 'ph',
    color: '#592150',
    label: 'pH',
    interperet: value => {
      if (value < 6) return 'Acidic'
      if (value > 8) return 'Basic'
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
        value: 8,
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

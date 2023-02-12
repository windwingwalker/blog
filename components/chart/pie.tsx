// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { LegendProps } from '@nivo/legends'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const legendsProperties: LegendProps[] = [{
  anchor: 'bottom',
  direction: 'row',
  justify: false,
  translateX: 0,
  translateY: 56,
  itemsSpacing: 0,
  itemWidth: 100,
  itemHeight: 18,
  itemTextColor: '#999',
  itemDirection: 'left-to-right',
  itemOpacity: 1,
  symbolSize: 18,
  symbolShape: 'circle',
  effects: [
    {
      on: 'hover',
      style: {
        itemTextColor: '#000'
      }
    }
  ]
}]

const arcLabelsProperties = {
  arcLabelsSkipAngle: 10, 
}

const arcLinkLabelProperties = {
  arcLinkLabelsSkipAngle: 10,
  arcLinkLabelsTextColor: "#333333",
  arcLinkLabelsThickness: 2,
  arcLinkLabelsColor: { from: 'color' }
}

const styleProperties = {
  fill: [
    {
      match: {
          id: 'ruby'
      },
      id: 'dots'
    },
    {
      match: {
          id: 'c'
      },
      id: 'dots'
    },
    {
        match: {
            id: 'go'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'python'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'scala'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'lisp'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'elixir'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'javascript'
        },
        id: 'lines'
    }
  ],
  defs: [
    {
      id: 'dots',
      type: 'patternDots',
      background: 'inherit',
      color: 'rgba(255, 255, 255, 0.3)',
      size: 4,
      padding: 1,
      stagger: true
    },
    {
      id: 'lines',
      type: 'patternLines',
      background: 'inherit',
      color: 'rgba(255, 255, 255, 0.3)',
      rotation: -45,
      lineWidth: 6,
      spacing: 10
    }
  ],
  borderWidth: 1,
}

const baseProperties = {
  innerRadius: 0.5,
  padAngle: 0.7,
  cornerRadius: 3,
  margin: { top: 40, right: 80, bottom: 80, left: 80 }
}

const interactivityProperties = {
  activeOuterRadiusOffset: 8,
}

const MyResponsivePie: React.FC<any> = ({ data }) => {
  // const legendsProperties: object = 
  return (
    <ResponsivePie
      data={data}
      {...baseProperties}
      {...interactivityProperties}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
      {...arcLinkLabelProperties}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
      arcLinkLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 1.2]],
    }}
      {...arcLabelsProperties}
      {...styleProperties}
      // legends={legendsProperties}
    />);
}

export default MyResponsivePie;
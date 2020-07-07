# world-network

> Render a D3 map of Earth with a superimposed (non-directed) graph on its surface that consists of edges between nodes whose locations are defined by lon/lat coordinates.

## Install

```bash
npm install --save world-network
```

## Usage

Along with React, the `WorldNetwork` component needs to be imported. The stylesheet that ships with this module can be pulled from `@mwatson/world-network/dist/index.css` after installation, and will give basic styling.

```jsx
import React from 'react'
import WorldNetwork from 'world-network'
import 'world-network/dist/index.css'
```

Then use the component in your React component with the following props: `projection`, `scale`, `nodes`, and `edges`.

```jsx
<WorldNetwork
  projection="geoOrthographic" 
  scale={ 300 }
  nodes={ nodes }
  edges={ edges }
/>
```

### Props

#### Projection

The projection props takes a string equal to one of the following of D3's built-in projections:

- geoAlbers
- geoAzimuthalEqualArea
- geoAzimuthalEquidistant
- geoConicConformal
- geoConicEqualArea
- geoConicEquidistant
- geoEqualEarth
- geoEquirectangular
- geoGnomonic
- geoMercator
- geoNaturalEarth1
- geoOrthographic
- geoProjection
- geoTransverseMercator

#### Scale

Because the result from different projections can vary the size and shape of the rendered map, the scale prop is exposed to adjust for this.

#### Nodes

The nodes props receives an Array of Objects of the following shape:

```json
{
  "id": "london",
  "name": "London",
  "location": [-0.1275, 51.50722]
}
```
where `id` is a unique identifier for the node, `name` is the name to display to the client, and `location` is an Array of coordinates (Numbers): `[longitude, latitude]`.

#### Edges

The edges prop receives an Array of two-dimensional Arrays, each of which identifies two nodes to be connected by a path in the resulting graph. This edge Array would instruct the WorldNetwork component to draw three (non-directed) edges between New York City and London, Mexico City, and Zanzibar.

```json
[
  ["london", "new-york-city"],
  ["mexico-city", "new-york-city"],
  ["zanzibar", "new-york-city"]
]
```


## License

MIT © [mbwatson](https://github.com/mbwatson)

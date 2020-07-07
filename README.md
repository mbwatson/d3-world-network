# world-network

> Render a D3 map of Earth with a superimposed (non-directed) graph on its surface that consists of edges between nodes whose locations are defined by lon/lat coordinates.

## Install

```bash
npm install --save world-network
```

## Usage

### Imports

Along with React, the `WorldNetwork` component needs to be imported. 

```jsx
import React from 'react'
import WorldNetwork from 'world-network'
import '@mwatson/world-network/dist/index.css'
```

The stylesheet that ships with this module can be pulled from `@mwatson/world-network/dist/index.css`, and it will provide basic styling. This module uses CSS modules, so the resulting class names look something like this: `_styles__country__192bf`. The styles can be overridden by selecting DOM elements by partial class names, like `path[class*="_styles__country"]`, which would select all country paths in the resulting SVG.

### Using the WorldNetwork Component

Use the WorldNetwork component within your React component by passing it the following props: `projection`, `scale`, `nodes`, and `edges`, which will be detailed below.

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

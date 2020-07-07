import React from 'react'
import { WorldNetwork } from '@mwatson/world-network'
import '@mwatson/world-network/dist/index.css'

const nodes = [
    { "id": "london", "name": "London", "location": [-0.1275, 51.50722], "color": "white" },
    { "id": "mexico-city", "name": "Mexico City", "location": [-99.1310, 19.4424], "color": "white" },
    { "id": "new-york-city", "name": "New York City", "location": [-73.935242, 40.730610], "color": "white" },
    { "id": "zanzibar", "name": "Zanzibar", "location": [ 39.31, -6.13], "color": "white" },
    { "id": "tokyo", "name": "Tokyo", "location": [ 139.76, 35.68], "color": "white" },
    { "id": "auckland", "name": "Auckland", "location": [174.78, -36.85], "color": "white" },
    { "id": "bangkok", "name": "Bangkok", "location": [ 100.48, 13.75], "color": "orange" },
    { "id": "delhi", "name": "Delhi", "location": [ 77.38, 29.01], "color": "orange" },
    { "id": "singapore", "name": "Singapore", "location":  [103.75, 1.36], "color": "orange" },
    { "id": "brasilia", "name": "Brasilia", "location": [-47.43, 15.67], "color": "orange" },
    { "id": "rio-de-janeiro", "name": "Rio de Janeiro", "location": [-43.24, 22.90], "color": "orange" },
    { "id": "toronto", "name": "Toronto", "location": [-79.40, 43.64], "color": "orange" },
    { "id": "easter-island", "name": "Easter Island", "location": [-109.36, 27.11], "color": "orange" },
    { "id": "seattle", "name": "Seattle", "location": [-122.33, 47.61], "color": "orange" }
]

const edges = [
  ["london", "new-york-city"],
  ["mexico-city", "new-york-city"],
  ["zanzibar", "new-york-city"],
  ["tokyo", "new-york-city"],
  ["auckland", "new-york-city"],
  ["bangkok", "new-york-city"],
  ["delhi", "new-york-city"],
  ["singapore", "new-york-city"],
  ["brasilia", "new-york-city"],
  ["rio-de-janeiro", "new-york-city"],
  ["toronto", "new-york-city"],
  ["easter-island", "new-york-city"],
  ["seattle", "new-york-city"]
]

function App() {
    return (
        <div className="app">
            <h1>Network Map</h1>
            <hr/>
            <WorldNetwork
                projection="geoOrthographic"
                scale={ 300 }
                nodes={ nodes }
                edges={ edges }
            />
        </div>
    )
}

export default App

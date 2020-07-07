import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import geoJson from './world.json'
import { dragHandlers, generateDrawingFunction, createProjectedPaths } from './utils'
import styles from './styles.css'

export const WorldNetwork = ({ width, height, margin, scale = 100, projection = 'geoNaturalEarth1', nodes, edges }) => {
    const svgRef = useRef()
    const [geoJsonNodes, setGeoJsonNodes] = useState([])
    const [geoJsonEdges, setGeoJsonEdges] = useState([])

    useEffect(() => {
        setGeoJsonNodes(nodes.map(node => ({ type: 'Point', coordinates: node.location })))
        setGeoJsonEdges(createProjectedPaths(nodes, edges))
    }, [])
    
    useEffect(() => {
        /*----------  INITIALIZE SVG  ----------*/
        const svg = d3.select(svgRef.current)
        const mapProjection = d3[projection]()
            .scale(scale).rotate([70, -20])
            .translate([width / 2, height / 2])
        const geoGenerator = d3.geoPath().projection(mapProjection)
        const { dragstarted, dragged, dragended } = dragHandlers(svg, mapProjection, geoGenerator)

        /*----------  DEFINE EVENT HANDLERS  ----------*/
        const drag = d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        svg.call(drag)
        const zoom = d3.zoom()
            .scaleExtent([1,3])
            .on('zoom', () => {
                // if (d3.event.sourceEvent.deltaY !== 0) { console.log(`zooming`, d3.event.sourceEvent.deltaY < 0 ? '+' : '-') }
                svg.selectAll('g')
                    .transition().duration(200)
                    .attr('transform', d3.event.transform)
            })
        svg.call(zoom)

        /*----------  DRAW, WHEN READY  ----------*/
        if (svgRef.current) {
            const { drawGeoShapes } = generateDrawingFunction(svg, geoGenerator)
            drawGeoShapes([{ type: 'Sphere' }], 'graticuleGroup', styles.projectionBorder) // projection border
            drawGeoShapes([d3.geoGraticule10()], 'graticuleGroup', styles.graticule) // graticule
            drawGeoShapes(geoJson.features, 'countriesGroup', styles.country) // countries
            drawGeoShapes(geoJsonNodes, 'nodesGroup', styles.node)
            drawGeoShapes(geoJsonEdges, 'edgesGroup', styles.edge)
        }
    }, [svgRef, width, height, edges, nodes, geoJsonNodes, geoJsonEdges, projection, scale])

    return (
        <svg ref={ svgRef } id="geomap" version="1.1" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" width={ `${ width }px` } height={ `${ height }px` }
            viewBox={ `0 0 ${ width } ${ height }` } preserveAspectRatio="xMidYMid meet"
        >
            <g className="graticuleGroup" />
            <g className="countriesGroup" />
            <g className="nodesGroup" />
            <g className="edgesGroup" />
        </svg>
    )
}

WorldNetwork.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
}

WorldNetwork.defaultProps = {
    width: 1200,
    height: 625,
    margin: 0,
    scale: 100,
}
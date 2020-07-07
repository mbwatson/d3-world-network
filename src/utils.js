import * as d3 from 'd3'
import { eulerAngles } from './rotation-functions'

export const generateDrawingFunction = (svg, pathGenerator) => {
    return {
        drawGeoShapes: (paths, groupClass, pathClass) => {
            const geoPaths = svg.select(`.${ groupClass }`).selectAll(`.${ pathClass }`)
                .data(paths)
            geoPaths.enter()
                .append('path').attr('class', pathClass)
                .merge(geoPaths)
                .attr('d', d => pathGenerator(d))
            geoPaths.exit().remove()
        }
    }
}

export const createProjectedPaths = (nodes, edges) => edges.map(edge => {
    const [source, sink] = edge
    const sourceNode = nodes.find(node => node.id === source)
    const sinkNode = nodes.find(node => node.id === sink)
    if (!sourceNode || !sinkNode) { return null }
    return ({
        type: 'LineString',
        coordinates: [sourceNode.location, sinkNode.location],
    })
})

export const dragHandlers = (svg, projection, pathGenerator) => {
    let gpos0
    let o0
    return {
        dragstarted: function() {
            gpos0 = projection.invert(d3.mouse(this))
            o0 = projection.rotate()
            // svg.insert('path')
            //     .datum({ type: 'Point', coordinates: gpos0})
            //     .attr('class', 'grab-point')
            //     .attr('r', 5)
            //     .attr('d', pathGenerator)
        },
        dragged: function() {
            var gpos1 = projection.invert(d3.mouse(this))
            if (d3.geoDistance(gpos0, gpos1) < 0.001) return 
            o0 = projection.rotate()
            var o1 = eulerAngles(gpos0, gpos1, o0)
            projection.rotate(o1)
            // svg.selectAll('.grab-point').datum({type: 'Point', coordinates: gpos1})
            svg.selectAll('path').attr('d', pathGenerator)
        },
        dragended: function() {
            // svg.selectAll('.grab-point').remove()
        },
    }
}
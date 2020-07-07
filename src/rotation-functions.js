var toRadians = Math.PI / 180
var toDegrees = 180 / Math.PI


// Helper function: cross product of two vectors v0&v1
const crossProduct = (v0, v1) => [v0[1] * v1[2] - v0[2] * v1[1], v0[2] * v1[0] - v0[0] * v1[2], v0[0] * v1[1] - v0[1] * v1[0]]

// Helper function: dot product of two vectors v0&v1
const dotProduct = (v0, v1) => {
    if (v0.length !== v1.length) { return undefined }
    return [...Array(v0.length).keys()].reduce((sum, i) => sum + v0[i] * v1[i], 0)
}

// Helper function: converts [lon, lat] coordinates into [x,y,z] Cartesian coordinate, origin at lon/lat (0,0) center of the earth
const lonlat2xyz = coord => {
    let lon = coord[0] * toRadians
    let lat = coord[1] * toRadians
    let x = Math.cos(lat) * Math.cos(lon)
    let y = Math.cos(lat) * Math.sin(lon)
    let z = Math.sin(lat)
    return [x, y, z]
}

// Helper function: computes a quaternion representation for the rotation between to vectors
const quaternion = (v0, v1) => {
    if (v0 && v1) {
        var w = crossProduct(v0, v1)  // vector pendicular to v0 & v1
        var w_len = Math.sqrt(dotProduct(w, w)); // length of w     
        if (w_len === 0) return
        var theta = .5 * Math.acos(Math.max(-1, Math.min(1, dotProduct(v0, v1))))
        var qi  = w[2] * Math.sin(theta) / w_len
        var qj  = - w[1] * Math.sin(theta) / w_len
        var qk  = w[0]* Math.sin(theta) / w_len
        var qr  = Math.cos(theta)
        return theta && [qr, qi, qj, qk]
    }
}

// Helper function: converts euler angles to quaternion
const euler2quat = e => {
    if (!e) return
    let roll = .5 * e[0] * toRadians
    let pitch = .5 * e[1] * toRadians
    let yaw = .5 * e[2] * toRadians
    let sr = Math.sin(roll)
    let cr = Math.cos(roll)
    let sp = Math.sin(pitch)
    let cp = Math.cos(pitch)
    let sy = Math.sin(yaw)
    let cy = Math.cos(yaw)
    let qi = sr*cp*cy - cr*sp*sy
    let qj = cr*sp*cy + sr*cp*sy
    let qk = cr*cp*sy - sr*sp*cy
    let qr = cr*cp*cy + sr*sp*sy
    return [qr, qi, qj, qk]
}

// This functions computes a quaternion multiply, geometrially meaning combining two quant rotations
const quatMultiply = (q1, q2) => {
    if (!q1 || !q2) return
    let [a, b, c, d ] = q1
    let [e, f, g, h] = q2
    return [
        a*e - b*f - c*g - d*h,
        b*e + a*f + c*h - d*g,
        a*g - b*h + c*e + d*f,
        a*h + b*g - c*f + d*e
    ]
}

// This function converts quaternion to euler angles
const quat2euler = t => {
    if (!t) return
    return [
        Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * toDegrees, 
        Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * toDegrees, 
        Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * toDegrees
    ]
}

/*
    This function computes the euler angles when given two vectors, and a rotation
    Only required export from this file to be executed within d3 code.
    v0 - starting pos in lon/lat (obtained by projection.invert)
    v1 - ending pos in lon/lat (obtained by projection.invert)
    o0 - the projection rotation in euler angles at starting pos (v0) (obtained by projection.rotate)
*/

/*----------  Subsection comment block  ----------*/

export const eulerAngles = (v0, v1, o0) => {
    /*
        - first calculate the quaternion rotation between the two vectors, v0 & v1
        - then multiply this rotation onto the original rotation at v0
        - finally convert the resulted quat angle back to euler angles for d3 to rotate
    */
    var t = quatMultiply( euler2quat(o0), quaternion(lonlat2xyz(v0), lonlat2xyz(v1) ) )
    return quat2euler(t);    
}

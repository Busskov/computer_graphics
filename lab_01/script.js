const rgbNumbers = ['r', 'g', 'b']
const cmykNumbers = ['c', 'm', 'y', 'k']
const hsvNumbers = ['h', 's', 'v']

const rgbRange = ['r-range', 'g-range', 'b-range']
const cmykRange = ['c-range', 'm-range', 'y-range', 'k-range']
const hsvRange = ['h-range', 's-range', 'v-range']

const palette = 'palette'

const Skip = {
    "RGB": 0,
    "CMYK": 1,
    "HSV": 2
}

const Type = {
    "NUMBER": 4,
    "RANGE": 5
}

document.addEventListener('DOMContentLoaded', 
    () => {
        rgbNumbers.forEach(element => {
            document.getElementById(element).addEventListener('input', updateRgbNumbers)
        });

        cmykNumbers.forEach(element => {
            document.getElementById(element).addEventListener('input', updateCmykNumbers)
        });

        hsvNumbers.forEach(element => {
            document.getElementById(element).addEventListener('input', updateHsvNumbers)
        });

        rgbRange.forEach(element => {
            document.getElementById(element).addEventListener('input', updateRgbRange)
        });

        cmykRange.forEach(element => {
            document.getElementById(element).addEventListener('input', updateCmykRange)
        });

        hsvRange.forEach(element => {
            document.getElementById(element).addEventListener('input', updateHsvRange)
        });
    }
)

function updateRgbNumbers() {
    updateRgb(rgbNumbers[0], rgbNumbers[1], rgbNumbers[2], Type.NUMBER)
}

function updateRgbRange() {
    updateRgb(rgbRange[0], rgbRange[1], rgbRange[2], Type.RANGE)
}

function updateRgb(r_id, g_id, b_id, type) {
    r = document.getElementById(r_id).value
    g = document.getElementById(g_id).value
    b = document.getElementById(b_id).value
    updateAll(r, g, b, Skip.RGB, type)
}

function updateCmykNumbers() {
    updateCmyk(cmykNumbers[0], cmykNumbers[1], cmykNumbers[2], cmykNumbers[3], Type.NUMBER)
}

function updateCmykRange() {
    updateCmyk(cmykRange[0], cmykRange[1], cmykRange[2], cmykRange[3], Type.RANGE)
}

function updateCmyk(c_id, m_id, y_id, k_id, type) {
    c = document.getElementById(c_id).value
    m = document.getElementById(m_id).value
    y = document.getElementById(y_id).value
    k = document.getElementById(k_id).value
    r = 255 * (100 - c) * (100 - k) / 10000
    g = 255 * (100 - m) * (100 - k) / 10000
    b = 255 * (100 - y) * (100 - k) / 10000
    updateAll(r, g, b, Skip.CMYK, type)
}

function updateHsvNumbers() {
    updateHsv(hsvNumbers[0], hsvNumbers[1], hsvNumbers[2], Type.NUMBER)
}

function updateHsvRange() {
    updateHsv(hsvRange[0], hsvRange[1], hsvRange[2], Type.RANGE)
}

function updateHsv(h_id, s_id, v_id, type) {
    h = document.getElementById(h_id).value
    s = document.getElementById(s_id).value
    v = document.getElementById(v_id).value
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    updateAll(r, g, b, Skip.HSV, type)
}

function updatePalette() {
    color = document.getElementById(palette)
}

function updateAll(r, g, b, skip, type) {
    const color = `rgb(${r}, ${g}, ${b})`
    document.body.style.backgroundColor = color

    if (skip == Skip.RGB) {
        if (type != Type.NUMBER) {
            document.getElementById(rgbNumbers[0]).value = r
            document.getElementById(rgbNumbers[1]).value = g
            document.getElementById(rgbNumbers[2]).value = b
        }
        if (type != Type.RANGE) {
            document.getElementById(rgbRange[0]).value = r
            document.getElementById(rgbRange[1]).value = g
            document.getElementById(rgbRange[2]).value = b
        }
    } else {
        document.getElementById(rgbNumbers[0]).value = r
        document.getElementById(rgbNumbers[1]).value = g
        document.getElementById(rgbNumbers[2]).value = b
        document.getElementById(rgbRange[0]).value = r
        document.getElementById(rgbRange[1]).value = g
        document.getElementById(rgbRange[2]).value = b
    }
    
    k = min(100 - r * 100 / 255, 100 - g * 100 / 255, 100 - b * 100 / 255)
    c = (100 - r * 100 / 255 - k) / (100 - k) * 100
    m = (100 - g * 100 / 255 - k) / (100 - k) * 100
    y = (100 - b * 100 / 255 - k) / (100 - k) * 100
    if (skip == Skip.CMYK) {
        if (type != Type.NUMBER) {
            document.getElementById(cmykNumbers[0]).value = c
            document.getElementById(cmykNumbers[1]).value = m
            document.getElementById(cmykNumbers[2]).value = y
            document.getElementById(cmykNumbers[3]).value = k
        }
        if (type != Type.RANGE) {
            document.getElementById(cmykRange[0]).value = c
            document.getElementById(cmykRange[1]).value = m
            document.getElementById(cmykRange[2]).value = y
            document.getElementById(cmykRange[3]).value = k
        }
    } else {
        document.getElementById(cmykNumbers[0]).value = c
        document.getElementById(cmykNumbers[1]).value = m
        document.getElementById(cmykNumbers[2]).value = y
        document.getElementById(cmykNumbers[3]).value = k
        document.getElementById(cmykRange[0]).value = c
        document.getElementById(cmykRange[1]).value = m
        document.getElementById(cmykRange[2]).value = y
        document.getElementById(cmykRange[3]).value = k
    }

    v = max(r / 255, g / 255, b / 255)
    tmp = min(r / 255, g / 255, b / 255)
    if (v == 0) {
        s = 0
    } else {
        s = (v - tmp) / v
    }

    if (s == 0) {
        h = 0
    } else {
        cr = (v - r / 255) / (v - tmp)
        cg = (v - g / 255) / (v - tmp)
        cb = (v - b / 255) / (v - tmp)
    }

    if (r / 255 == v) {
        h = cb - cg
    }
    if (g / 255 == v) {
        h = 2 + gr - gb
    }
    if (b / 255 == v) {
        h = 4 + cg - cr
    }
    h = h * 60
    if (h < 0) {
        h = h + 360
    }
    v = v * 100
    s = s * 100

    if (skip == Skip.HSV) {
        if (type != Type.NUMBER) {
            document.getElementById(hsvNumbers[0]).value = h
            document.getElementById(hsvNumbers[1]).value = s
            document.getElementById(hsvNumbers[2]).value = v
        }
        if (type != Type.RANGE) {
            document.getElementById(hsvRange[0]).value = h
            document.getElementById(hsvRange[1]).value = s
            document.getElementById(hsvRange[2]).value = v
        }
    } else {
        document.getElementById(hsvNumbers[0]).value = h
        document.getElementById(hsvNumbers[1]).value = s
        document.getElementById(hsvNumbers[2]).value = v
        document.getElementById(hsvRange[0]).value = h
        document.getElementById(hsvRange[1]).value = s
        document.getElementById(hsvRange[2]).value = v
    }
}

function min(a, b, c) {
    if (a <= b && a <= c) {
        return a
    }
    if (b <= a && b <= c) {
        return b
    }
    return c
}

function max(a, b, c) {
    if (a >= b && a >= c) {
        return a
    }
    if (b >= a && b >= c) {
        return b
    }
    return c
}
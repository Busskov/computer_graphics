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
    "HSV": 2,
    "PALETTE": 3
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

        document.getElementById(palette).addEventListener('input', updatePalette)
    }
)

function updateRgbNumbers() {
    updateRgb(rgbNumbers[0], rgbNumbers[1], rgbNumbers[2], Type.NUMBER)
}

function updateRgbRange() {
    updateRgb(rgbRange[0], rgbRange[1], rgbRange[2], Type.RANGE)
}

function updateRgb(r_id, g_id, b_id, type) {
    r = parseInt(document.getElementById(r_id).value)
    g = parseInt(document.getElementById(g_id).value)
    b = parseInt(document.getElementById(b_id).value)
    updateAll(r, g, b, Skip.RGB, type)
}

function updateCmykNumbers() {
    updateCmyk(cmykNumbers[0], cmykNumbers[1], cmykNumbers[2], cmykNumbers[3], Type.NUMBER)
}

function updateCmykRange() {
    updateCmyk(cmykRange[0], cmykRange[1], cmykRange[2], cmykRange[3], Type.RANGE)
}

function updateCmyk(c_id, m_id, y_id, k_id, type) {
    c = parseInt(document.getElementById(c_id).value)
    m = parseInt(document.getElementById(m_id).value)
    y = parseInt(document.getElementById(y_id).value)
    k = parseInt(document.getElementById(k_id).value)
    r = 255 * (100 - c) * (100 - k) / 10000
    g = 255 * (100 - m) * (100 - k) / 10000
    b = 255 * (100 - y) * (100 - k) / 10000
    updateAll(Math.round(r), Math.round(g), Math.round(b), Skip.CMYK, type)
}

function updateHsvNumbers() {
    updateHsv(hsvNumbers[0], hsvNumbers[1], hsvNumbers[2], Type.NUMBER)
}

function updateHsvRange() {
    updateHsv(hsvRange[0], hsvRange[1], hsvRange[2], Type.RANGE)
}

function updateHsv(h_id, s_id, v_id, type) {
    h = parseInt(document.getElementById(h_id).value)
    s = parseInt(document.getElementById(s_id).value)
    v = parseInt(document.getElementById(v_id).value)
    
    rgb = hsvToRgb(h, s, v)
    updateAll(rgb[0], rgb[1], rgb[2], Skip.HSV, type)
}

function updatePalette() {
    color = document.getElementById(palette).value
    colors = hexToRgv(color)
    updateAll(colors[0], colors[1], colors[2], Skip.PALETTE, 0)
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
    
    k = Math.min(100 - r * 100 / 255, 100 - g * 100 / 255, 100 - b * 100 / 255)
    if (k == 100) {
        c = 0
        m = 0
        y = 0
    } else {
        c = Math.round((100 - r * 100 / 255 - k) / (100 - k) * 100)
        m = Math.round((100 - g * 100 / 255 - k) / (100 - k) * 100)
        y = Math.round((100 - b * 100 / 255 - k) / (100 - k) * 100)
    }

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

    if (skip != Skip.PALETTE) {
        document.getElementById(palette).value = rgbToHex(r, g, b)
    }

    hsl = rgbToHSL(r, g, b)
    hsv = hslToHsv(hsl[0], hsl[1], hsl[2])
    h = hsv[0]
    s = hsv[1]
    v = hsv[2]

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

function hsvToRgb(h, s, v){
    h /= 100
    s /= 100
    v /= 100
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

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHSL(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    let max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return [h, s, l]
}

function hslToHsv(h, s, l) {
    s /= 100
    l /= 100
    v = l + s * Math.min(l, 1 - l)
    if (v == 0) {
        s = 0
    } else {
        2 * (1 - l / v)
    }
    return [Math.round(h), Math.round(s * 100), Math.round(v * 100)]
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function hexToRgv(hex) {
    console.log(hex)
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    console.log("good")
    return [Math.round(r), Math.round(g), Math.round(b)]
}

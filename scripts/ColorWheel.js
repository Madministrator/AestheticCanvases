/**
 * An object which displays a fun cycling color wheel inside a canvas element
 */
class ColorWheel {
    /**
     * Creates a ColorWheel object
     * @param {Element} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        // perform a DPI resolution fix on the canvas
        let dpi = window.devicePixelRatio
        // get css properties to match up
		let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
		let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
		// scale the canvas for better DPI
		canvas.setAttribute('height', style_height * dpi)
		canvas.setAttribute('width', style_width * dpi)

        // settings for wheels appearance
        this.numRays = 100
        this.rotationSpeed = 0.06
        this.rotationFactor = 0
        this.backgroundColor = '#000' // black
        this.dotSize = 3
        this.lineThickness = 1
        this.radiusFraction = 0.6

        // change the background color of the canvas to be the desired color
        this.canvas.style.backgroundColor = this.backgroundColor
    }

    /**
     * Given a percent, pick a color from along the color spectrum (rainbow)
     * @param {Number} theta The angle in radians on the color wheel to angle towards
     * @returns {String} A string which represents a color in HSL format
     */
    rainbowPick(theta) {
        // ensure theta is within bounds
        while (theta > 2 * Math.PI) { theta -= 2 * Math.PI }
        while (theta < 0) { theta += 2 * Math.PI }
        // convert to degrees
        const hue = theta * 180 / Math.PI
        return `hsl(${hue}, 100%, 50%)`
    }

    /**
     * Draws a line with dots at either end of the line
     * @param {Number} x1 The X coordinate of the starting dot
     * @param {Number} y1 The Y coordinate of the starting dot
     * @param {Number} x2 The X coordinate of the ending dot
     * @param {Number} y2 The Y coordinate of the ending dot
     * @param {Color} color The color of the dot and lines
     */
    drawLineWithDots(x1, y1, x2, y2, color) {
        // setup color and appearance
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = this.lineThickness
        this.ctx.fillStyle = color
        // draw the dots on either end of the line
        this.ctx.arc(x1, y1, this.dotSize, 0, 360)
        this.ctx.fill()
        this.ctx.arc(x2, y2, this.dotSize, 0, 360)
        this.ctx.fill()
        // connect the dots with aline
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
        this.ctx.beginPath()
    }

    /**
     * Draws the entire wheel and sets the wheel up for the next draw cycle
     * @param {Number} turnFactor The amount to turn the inner circle of dots, in radians.
     */
    drawWheel() {
        // clear the previous drawing
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        // save initial state
        this.ctx.save()
        // determine the outer radius of the wheel (the inner radius is a fraction the outer radius)
        let radius = this.canvas.height <= this.canvas.width ? this.canvas.height / 2 : this.canvas.width / 2
        radius *= 0.9 // leave a gap between the edge of the canvas and the outer radius
        // center the context origin in the canvas
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)

        // rotate around a circle, drawing "spokes" of the wheel
        for (let i = 0; i < this.numRays; i++) {
            const theta = (i * Math.PI / (this.numRays / 2)) - Math.PI / 2
            // point 1 = outer radius, point 2 = inner radius
            const x1 = radius * Math.cos(theta)
            const y1 = radius * Math.sin(theta)
            const x2 = this.radiusFraction * radius * Math.cos(theta + this.rotationFactor)
            const y2 = this.radiusFraction * radius * Math.sin(theta + this.rotationFactor)
            this.drawLineWithDots(x1, y1, x2, y2, this.rainbowPick(theta))
        }
        // update the rotation factor for the next call to this function
        this.rotationFactor += this.rotationSpeed
        // limit the size of the rotationFactor to prevent large numbers
        while (this.rotationFactor > 2 * Math.PI)
        {
            this.rotationFactor -= 2 * Math.PI
        }
        // restore initial state
        this.ctx.restore()
    }

}
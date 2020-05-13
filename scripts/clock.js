/**
 * A class which displays a clock inside a canvas element.
 * Provides some customization options.
 * Inspired by https://www.w3schools.com/graphics/canvas_clock.asp
 * and https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
 * but made more modular as a class object, and I use polar coordinates
 * to draw the clock rather than shifting the entire context.
 */
class Clock {
    /**
     * Creates a Clock object.
     * @param {Element} canvas the canvas we wish to draw on.
     */
    constructor(canvas) {
        this.canvasElement = canvas
        this.ctx = canvas.getContext('2d')
        // settings for the clock's appearance
        this.drawTickMarks = false
        this.faceColor = 'white'
        this.baseColor = '#333'
        this.backgroundColor = '#333'
        this.font = 'arial'
        this.flatten = false

        // change the background color of the canvasElement if it isn't
        // already in the desired color.
        this.canvasElement.style.backgroundColor = this.backgroundColor
    }

    // GETTERS AND SETTERS FOR CLOCK APPEARANCE

    /**
     * Changes behavior of clock to draw the tickmarks or the numbers in the hours
     * @param {Boolean} show A boolean indicating if the tick marks should be drawn. Defaults to true.
     */
    showTickMarks(show = true) {
        this.drawTickMarks = show
    }

    /**
     * change the color of the clock face.
     * @param {String} color a string representing a color, hex value, or RGBA value, defaults to 'white'
     */
    setFaceColor(color = 'white') {
        this.faceColor = color
    }

    /**
     * change the color of the clock hands and ticks/numbers
     * @param {String} color a string representing a color, hex value, or RGBA value, defaults to 'white'
     */
    setBaseColor(color = '#333') {
        this.baseColor = color
    }

    /**
     * change the background color of the canvas element
     * @param {String} color a string representing a color, hex value, or RGBA value, defaults to 'white'
     */
    setBackgroundColor(color = '#333') {
        this.backgroundColor = color
        this.canvasElement.style.backgroundColor = this.backgroundColor
    }

    /**
     * change the font of the numbers drawn if this.drawTickMarks is set to false
     * @param {DOMString} font A string parsable as a CSS font value, defaults to 'arial'
     */
    setFont(font = 'arial') {
        this.font = font
    }

    /**
     * 
     * @param {Boolean} show A boolean indicating if the gradient edge should be shown
     */
    showGradient(show = true) {
        this.flatten = !show
    }

    // DRAWING FUNCTIONS

    /**
     * Draws the clock face once. 
     */
    drawClock() {
        // save initial state
        this.ctx.save()
        // use the dimensions of the canvas to determine the clock's size.
        let radius = this.canvasElement.height <= this.canvasElement.width ? 
            this.canvasElement.height / 2 : this.canvasElement.width / 2
        // center the context origin in the canvas
        this.ctx.translate(radius, radius)
        // perform all the drawing operations
        radius = radius * 0.95
        this.drawFace(radius)
        this.drawNumbers(radius)
        this.drawTime(radius)
        // restore initial state
        this.ctx.restore()
    }

    /**
     * Draws the face of the clock
     * @param {Number} r the radius of the clock's face
     */
    drawFace(r) {
        // draw the circular base
        this.ctx.arc(0,0, r, 0, 2 * Math.PI)
        this.ctx.fillStyle = this.faceColor
        this.ctx.fill()
        // gradient to create a 3D edge appearance
        if (this.flatten) { // draw with no depth
            this.ctx.strokeStyle = this.baseColor
            this.ctx.lineWidth = r * 0.05
            this.ctx.stroke()
        } else { // draw gradient to give depth
            let grad = this.ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.02)
            grad.addColorStop(0, this.baseColor)
            grad.addColorStop(0.5, this.faceColor)
            grad.addColorStop(1, this.baseColor)
            this.ctx.strokeStyle = grad
            this.ctx.lineWidth = r * 0.1
            this.ctx.stroke()
        }
        // draw dot in center of clock for hands to be attached to.
        this.ctx.beginPath()
        this.ctx.arc(0, 0, r * 0.1, 0, 2 * Math.PI)
        this.ctx.fillStyle = this.baseColor
        this.ctx.fill()
    }

    /**
     * Draws the numbers around the edge of the clock, or the tick marks
     * if this.drawTickMarks is true.
     * @param {Number} r the radius of the clock's face
     */
    drawNumbers(r) {
        if (this.drawTickMarks) {
            // Hour marks
            this.ctx.lineWidth = 4
            for (let i = 0; i < 12; i++) {
                let theta = (i * Math.PI / 6) - Math.PI / 2
                let x1 = r * 0.82 * Math.cos(theta)
                let y1 = r * 0.82 * Math.sin(theta)
                let x2 = r * 0.95 * Math.cos(theta)
                let y2 = r * 0.95 * Math.sin(theta)
                this.ctx.beginPath()
                this.ctx.moveTo(x1, y1)
                this.ctx.lineTo(x2, y2)
                this.ctx.stroke()
            }
            // Minute Marks
            this.ctx.lineWidth = 2.5
            for (let i = 0; i < 60; i++) {
                let theta = (i * Math.PI / 30) - Math.PI / 2
                let x1 = r * 0.895 * Math.cos(theta)
                let y1 = r * 0.895 * Math.sin(theta)
                let x2 = r * 0.95 * Math.cos(theta)
                let y2 = r * 0.95 * Math.sin(theta)
                this.ctx.beginPath()
                this.ctx.moveTo(x1, y1)
                this.ctx.lineTo(x2, y2)
                this.ctx.stroke()
            }
        } else { // use numbers for the hours and have no minute marks
            this.ctx.font = r * 0.15 + "px " + this.font
            this.ctx.textBaseline = 'middle'
            this.ctx.textAlign = 'center'

            for(let i = 1; i < 13; i++) {
                let theta = (i * Math.PI / 6) - Math.PI / 2
                let x = r * Math.cos(theta) * 0.85
                let y = r * Math.sin(theta) * 0.85
                this.ctx.fillText(i.toString(), x, y)
            }
        }
    }

    /**
     * Draws the current time using an hour, minute, and second hand.
     * @param {Number} r The radius of the clock
     */
    drawTime(r) {
        let now = new Date()
        let hour = now.getHours()
        let minute = now.getMinutes()
        let second = now.getSeconds()
        // hour
        hour = hour % 12
        hour =  (hour * Math.PI / 6 ) + (minute * Math.PI / (6 * 60)) 
                + (second * Math.PI / (360 * 60))
        this.drawHand(hour, r * 0.5, r * 0.07)
        //minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60))
        this.drawHand(minute, r * 0.75, r * 0.07)
        // second
        second = (second*Math.PI/30)
        this.drawHand(second, r * 0.85, r * 0.02)
    }

    /**
     * 
     * @param {Number} theta The angle in radians to draw the hand at, assuming
     * 
     * @param {Number} length The length of the hand
     * @param {Number} width The width of the hand
     */
    drawHand(theta, length, width) {
        theta -= Math.PI / 2
        let x = length * Math.cos(theta)
        let y = length * Math.sin(theta)
        // set drawing behavior
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = width
        // draw the hand
        this.ctx.beginPath()
        this.ctx.moveTo(0,0)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        this.ctx.beginPath()
    }
}
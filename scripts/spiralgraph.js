/**
 * Creates a mesmerizing pattern of spiraling dots built around the golden ratio.
 */
class SpiralGraph {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        // Appearance Based Features
        this.dotColor = 'white'
        // animation variables
        this.numPoints = 200
        this.turnFraction = 0.5
        this.turnModifier = 0.00001
        this.spreadPower = 1
    }

    drawSpiral() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.save()
        // find the center and the radius of the canvas
        const radius = this.canvas.height < this.canvas.width ?
            this.canvas.height / 2 : this.canvas.width / 2
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)

        for (let i = 0; i < this.numPoints; i++) {
            // get the polar coordinates of a point
            let distance = (Math.pow(i / (this.numPoints - 1), this.spreadPower)) * radius * 0.9
            let angle = 2 * Math.PI * this.turnFraction * i
            // convert to cartesian coordinates
            let x = distance * Math.cos(angle)
            let y = distance * Math.sin(angle)

            // draw the circle
            this.ctx.fillStyle = this.dotColor
            this.ctx.beginPath()
            this.ctx.arc(x, y, radius * 0.015, 0, 2 * Math.PI)
            this.ctx.fill()
        }

        this.ctx.restore()
    }

    movePoints() {
        if (this.turnFraction >= 1 - Math.abs(this.turnModifier) && this.turnModifier > 0
            || this.turnFraction <= Math.abs(this.turnModifier) && this.turnModifier < 0) {
            this.turnModifier = - this.turnModifier
        }
        this.turnFraction += this.turnModifier
    }

    step() {
        this.drawSpiral()
        this.movePoints()
    }

}
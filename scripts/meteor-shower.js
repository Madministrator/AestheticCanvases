/**
 * A class which fills a canvas element with a display of meteors
 * flying across the screen.
 */
class MeteorShower {
	/*
		Aside from a constructor, we should have a start and stop function.
	*/

	/**
	 * Creates a MeteorShower object
	 * @param {Element} canvas the canvas we wish to draw on.
	*/
   constructor(canvas) {
	   this.canvas = canvas
	   this.ctx = this.canvas.getContext('2d')
	   // settings for shower appearance
	   this.fadeSpeed = 0.35
	   this.meteorRate = 0.9 // must be a number between zero and one
	   this.velocity = 4
	   this.meteorSize = 2
	   this.meteors = []
   }

   /**
	* Goes through one iteration of the animation cycle
	*/
   step() {
	   // fade out previous animation frames to get a trailing effect
	   this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeSpeed})`
	   this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
	   // see if we want to add a new meteor
	   if (Math.random() < this.meteorRate) {
		   // create a meteor
		   let xVelocity = (Math.random() - 0.5) * 2 * this.velocity
		   let yVelocity = (Math.random() - 0.5) * 2 * this.velocity
		   let radius = (Math.random() - 0.5) * 2 + this.meteorSize // this.meteorsize +/- 1
		   let opacity = 1 - Math.random() * 0.5
		   let startX = 0
		   let startY = 0
		   // determine the starting location
		   if (xVelocity >= 0 && yVelocity >= 0) {
			   // meteor is going down and to the right
			   if (Math.round(Math.random()) === 0) {
				   // start on the top
				   startX = Math.random() * this.canvas.clientWidth * 0.75
			   } else {
				   // start on the left
				   startY = Math.random() * this.canvas.clientHeight * 0.75
			   }
		   } else if (xVelocity < 0 && yVelocity >= 0) {
			   // meteor is going down and to the left
			   if (Math.round(Math.random()) === 0) {
				// start on the top
				startX = Math.random() * this.canvas.clientWidth * 0.75 + this.canvas.clientWidth * 0.25
				} else {
					// start on the right
					startY = Math.random() * this.canvas.clientHeight * 0.75
					startX = this.canvas.clientWidth
				}
		   } else if (xVelocity >= 0) {
			   // meteor is going up and to the right
			   if (Math.round(Math.random()) === 0) {
					// start on the bottom
					startX = Math.random() * this.canvas.clientWidth * 0.75
					startY = this.canvas.clientHeight
				} else {
					// start on the left
					startY = Math.random() * this.canvas.clientHeight * 0.75 + this.canvas.clientHeight * 0.25
				}
		   } else {
			   // meteor is going up and to the left
			   	if (Math.round(Math.random()) === 0) {
					// start on the bottom
					startX = Math.random() * this.canvas.clientWidth * 0.75 + this.canvas.clientWidth * 0.25
					startY = this.canvas.clientHeight
				} else {
					// start on the right
					startY = Math.random() * this.canvas.clientHeight * 0.75 + this.canvas.clientHeight * 0.25
					startX = this.canvas.clientWidth
				}
		   }
		   // append the meteor
		   let newMeteor = {
				x: startX, 
				y: startY, 
				xv: xVelocity, 
				yv: yVelocity,
				r: radius, 
				alpha: opacity
			}
		   this.meteors.push(newMeteor)
	   }
	   // change the rate at which meteors can appear by no more than 5%
	   this.meteorRate += (Math.random() - 0.5) * 0.1
	   // apply constraints
	   if (this.meteorRate > 1) { this.meteorRate = 1 }
	   else if (this.meteorRate < 0) { this.meteorRate = 0 }

	   // draw & modify all meteors in the shower.
	   for (let i = 0; i < this.meteors.length; i++) {
		   let meteor = this.meteors[i]
		   // remove the meteor before drawing if the meteor is out of bounds
		   if (meteor.x < 0 || meteor.x > this.canvas.clientWidth 
				|| meteor.y < 0 || meteor.y > this.canvas.clientHeight
				|| meteor.alpha <= 0) {
				this.meteors.splice(i,1)
				i -= 1
				continue
			}
		   // draw the meteor
		   this.ctx.save()
		   this.ctx.fillStyle = `rgba(255, 255, 255, ${meteor.alpha})`
		   this.ctx.beginPath()
		   this.ctx.arc(meteor.x, meteor.y, meteor.r, 0, 2 * Math.PI)
		   this.ctx.fill()
		   this.ctx.restore()
		   // modify the meteor's data for the next cycle
		   meteor.alpha -= Math.random() * 0.02
		   meteor.x += meteor.xv
		   meteor.y += meteor.yv
		}
	}
}

/*

Ok, there are several behaviors which I want to emulate with some pseudo-randomness
1. The meteors can come from any angle, not just the top of the screen.
2. The meteors can fizzle out before they leave the screen.
3. The meteors can vary in size and speed
4. The meteor shower can change the rate at which they appear.

*/

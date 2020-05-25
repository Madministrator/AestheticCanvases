class GameOfLife {
    /**
     * Creates a GameOfLife object.
     * @param {Element} canvas the canvas we wish to draw on.
     * @param {Window} window The window of the page the canvas resides in.
     * @param {number} cells Optional. The number of cells per column of the grid. Default to 100
     */
    constructor(canvas, window, cells) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        // perform a DPI resolution fix on the canvas
        let dpi = window.devicePixelRatio
        // get css properties to match up
		let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
		let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
		// scale the canvas for better DPI
		canvas.setAttribute('height', style_height * dpi)
		canvas.setAttribute('width', style_width * dpi)

        /*
            Determine how many cells we have
            given that we want to have 100 square
            cells for every column. And the number
            of cells for the width based on the height.
        */
       const cellsPerColumn = (cells != undefined) ? cells : 100
       this.cellSide = this.canvas.height / cellsPerColumn
       const cellsPerRow = Math.ceil(this.canvas.width / this.cellSide)
       const percentStartAlive = 0.1
       // create an array of booleans indicating if things are alive or not.
       this.cells = new Array(cellsPerColumn)
       for (let i = 0; i < this.cells.length; i++) {
           this.cells[i] = new Array(cellsPerRow)
           for (let j = 0; j < this.cells[i].length; j++) {
               this.cells[i][j] = (Math.random() < percentStartAlive)
           }
       }

       this.drawLines = true
       /*
            Add a mouse click event which will toggle the state of a cell wherever the 
            mouse clicks.
       */
      const cellDimension = this.cellSide
      const gol = this
      this.canvas.addEventListener('click', function(e) {
          let x = Math.floor(e.clientX / cellDimension)
          let y = Math.floor(e.clientY / cellDimension)
          gol.cells[y][x] = !gol.cells[y][x]
          gol.drawGrid()
      })
    }

    /**
     * Iterates through our matrix of cell states and determines
     * which cells live and which cells die.
     */
    lifeCycle() {
        /* 
        The "rules" of the game of life:
            - Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            - Any live cell with two or three neighbors lives on to the next generation.
            - Any live cell with more than three live neighbors dies, as if by overpopulation.
            - Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        To summarize these rules to be pseudo code friendlier:
            - Any live cell with two or three live neighbors survives
            - Any dead cell with three live neighbors becomes a live cell
            - All other live cells die, while all dead cells stay dead.
        All rules are applied to all cells simultaneously.
        */
       let newStates = this.cells.slice() // get a deep copy of the array so we don't modify the original
       for (let i = 0; i < this.cells.length; i++) {
           for (let j = 0; j < this.cells[i].length; j++) {
               // Count the number of living neighbors
               let lifeCount = 0
               if (i > 0 && j > 0 && this.cells[i-1][j-1]) {lifeCount++} // top left
               if (i > 0 && this.cells[i-1][j]) {lifeCount++} // top
               if (i > 0 && j < this.cells[i].length - 1 && this.cells[i-1][j+1]) {lifeCount++} // top right
               if (j > 0 && this.cells[i][j-1]) {lifeCount++} // left
               if (j < this.cells[i].length - 1 && this.cells[i][j+1]) {lifeCount++} // right
               if (i < this.cells.length - 1 && j > 0 && this.cells[i+1][j-1]) {lifeCount++} // bottom left
               if (i < this.cells.length - 1 && this.cells[i+1][j]) {lifeCount++} // bottom
               if (i < this.cells.length - 1 && j < this.cells[i].length - 1 && this.cells[i+1][j+1]) {lifeCount++} // bottom right
               // apply the rules
               if (this.cells[i][j]) {
                   // cell is currently alive
                   newStates[i][j] = lifeCount > 1 && lifeCount < 4
               } else {
                   // cell is currently dead
                   newStates[i][j] = lifeCount == 3
               }
           }
       }
    }

    /**
     * Draws the grid where the cells live and die.
     */
    drawGrid() {
        this.ctx.save()
        // clear the screen
        this.ctx.clearRect(0,0,this.canvas.clientWidth, this.canvas.clientHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.lineWidth = 1
        for(let i = 0; i < this.cells.length; i++) {
            let y = i * this.cellSide
            for(let j = 0; j < this.cells[i].length; j++) {
                let x = j * this.cellSide
                // draw the square of the cell
                this.ctx.beginPath()
                this.ctx.rect(x, y, this.cellSide, this.cellSide)
                if (this.cells[i][j]) {
                    this.ctx.fill()
                }
                if (this.drawLines) {this.ctx.stroke()}
            }
        }
        this.ctx.restore()
    }

    /**
     * Checks if there are any living cells.
     * @returns true if at least one cell is alive, false otherwise.
     */
    lifeExists() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                if (this.cells[i][j]) { return true }
            }
        }
        return false
    }

    /**
     * Performs one cycle of the game of life and draws it.
     */
    step() {
        this.lifeCycle()
        this.drawGrid()
    }
}
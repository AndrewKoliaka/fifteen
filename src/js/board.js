let _board = null;

function swap(number1, number2) {
    let coord1 = board.getCoord(number1);
    let coord2 = board.getCoord(number2);
    if (coord1 && coord2) {
        board.setCell(coord1.i, coord1.j, number2);
        board.setCell(coord2.i, coord2.j, number1);
    }
}

const board = {
    init() {
        _board = [];
        for (let i = 0; i < 4; i++) {
            _board.push(new Array(4).fill(0));
        }
    },
    shuffle() {
        let numbers = [];
        for (let i = 1; i < 16; i++) {
            numbers.push(i);
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (!numbers.length) {
                    this.setCell(i, j, 0);
                    break;
                }
                let random = Math.floor(Math.random() * numbers.length);
                this.setCell(i, j, numbers.splice(random - 1, 1)[0]);
            }
        }
    },
    getCell(i, j) {
        return _board[i][j];
    },
    setCell(i, j, value = 0) {
        _board[i][j] = value;
    },
    getCoord(number = 0) {
        let coord = null;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.getCell(i, j) === number) {
                    return coord = { i, j }
                }
            }
        }
        return coord;
    },
    getDirectionForMoving(number) {
        if (!number || !Number.isInteger(number)) {
            return null;
        }
        let zeroCoord = this.getCoord(0);
        let numberCoord = this.getCoord(number);

        if (numberCoord.i === zeroCoord.i) {
            return numberCoord.j > zeroCoord.j ? 'left' : 'right';
        } else if (numberCoord.j === zeroCoord.j) {
            return numberCoord.i > zeroCoord.i ? 'up' : 'down';
        }
        return null;
    },
    getCellsToMove(number) {
        if (!Number.isInteger(number)) {
            return null;
        }
        let numberCoord = this.getCoord(number);
        let zeroCoord = this.getCoord(0);
        let cellsToMove = [];
        if (numberCoord.i === zeroCoord.i) {
            if (this.getDirectionForMoving(number) === 'right') {
                for (let j = numberCoord.j; j < zeroCoord.j; j++) {
                    cellsToMove.push(this.getCell(numberCoord.i, j));
                }
            } else {
                for (let j = numberCoord.j; j > zeroCoord.j; j--) {
                    cellsToMove.push(this.getCell(numberCoord.i, j));
                }
            }

        } else if (numberCoord.j === zeroCoord.j) {
            if (this.getDirectionForMoving(number) === 'down') {
                for (let i = numberCoord.i; i < zeroCoord.i; i++) {
                    cellsToMove.push(this.getCell(i, numberCoord.j));
                }
            } else {
                for (let i = numberCoord.i; i > zeroCoord.i; i--) {
                    cellsToMove.push(this.getCell(i, numberCoord.j));
                }
            }
        }
        return cellsToMove;
    },
    move(numbers = []) {
        if (!Array.isArray(numbers) || !numbers.every((el) => {
                return Number.isInteger(el)
            })) {
            return false;
        }
        let self = this;
        let direction = this.getDirectionForMoving(numbers[0]);
        if (!direction || !numbers.every(el => {
                return self.getDirectionForMoving(el) === direction;
            })) {
            return false;
        }
        for (let i = numbers.length - 1; i >= 0; i--) {
            swap(numbers[i], 0)
        }
        return true;
    }
}

export default board;

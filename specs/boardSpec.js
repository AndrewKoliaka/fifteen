import board from '../src/js/board.js';

describe('board suite', function() {
    let values = [];

    function createInlineBoard() {
        values = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                values.push(board.getCell(i, j));
            }
        }
    }

    beforeEach(function() {
        board.init();
        board.shuffle();
        createInlineBoard();
    });

    it('should init', function() {
        board.init();
        createInlineBoard();
        expect(values.every((el) => {
            return el === 0;
        })).toBeTruthy();
    });

    it('should return coordinates by given number', function() {
        let number = board.getCell(0, 0);
        expect(board.getCoord(number)).toEqual({ i: 0, j: 0 })
    });

    it('should return direction for moving', function() {
        expect(board.getDirectionForMoving).toBeDefined();
        expect(board.getDirectionForMoving()).toBeNull();
        expect(board.getDirectionForMoving(board.getCell(2, 3))).toBe('down')
        board.setCell(3, 3, 20);
        board.setCell(2, 3, 0)
        expect(board.getDirectionForMoving(board.getCell(3, 3))).toBe('up');
        board.setCell(2, 3, 30);
        board.setCell(2, 2, 0);
        expect(board.getDirectionForMoving(board.getCell(2, 3))).toBe('left');
        board.setCell(2, 3, 0);
        board.setCell(2, 2, 40);
        expect(board.getDirectionForMoving(board.getCell(2, 2))).toBe('right');
    });

    it('should return cells to move', function() {
        let number = board.getCell(0, 3);
        let cellsToMove = board.getCellsToMove(number);
        expect(board.getCellsToMove()).toBeNull();
        expect(cellsToMove.length).toEqual(3);
        expect(board.getCellsToMove(0).length).toEqual(0);
    });

    describe('moves suite', function() {
        function makeMove(i, j) {
            let number = board.getCell(i, j);
            let cellsToMove = board.getCellsToMove(number);
            return board.move(cellsToMove);
        }

        it('should move cells', function() {
            expect(board.move).toBeDefined();
            expect(board.move()).toBeFalsy();
            expect(board.getCell(3, 3)).toBe(0);
            //move 3 numbers to right
            expect(makeMove(3, 0)).toBeTruthy();
            expect(board.getCell(3, 0)).toBe(0);
            //move 3 numbers to left
            expect(makeMove(3, 3)).toBeTruthy();
            expect(board.getCell(3, 3)).toBe(0);
            //move 3 numbers to down
            expect(makeMove(0, 3)).toBeTruthy();
            expect(board.getCell(0, 3)).toBe(0);
            //move 3 numbers to up
            expect(makeMove(3, 3)).toBeTruthy();
            expect(board.getCell(3, 3)).toBe(0);
        });
    });

    it('should shuffle', function() {
        let numbers = [];
        let orderMatches = 0;
        let valueMatches = 0;
        for (let i = 0; i < values.length; i++) {
            numbers.push(i);
        }
        numbers.forEach((num, index) => {
            if (num === values[index]) {
                orderMatches++;
            }
            if (values.indexOf(num) !== -1) {
                valueMatches++;
            }
        });
        expect(orderMatches).toBeLessThan(values.length);
        expect(valueMatches).toBe(16);
    });
});

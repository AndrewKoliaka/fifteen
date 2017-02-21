import board from '../src/js/board.js';

describe('board suite', function() {
    let values = [];

    function getValues() {
        values = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                values.push(board.getCell(i, j));
            }
        }
    }

    beforeEach(function() {
        board.init();
        getValues();
    });

    it('should init', function() {
        expect(values.every((el) => {
            return el === 0
        })).toBeTruthy();
    });

    it('should shuffle', function() {
        board.shuffle();
        getValues();
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
        expect(valueMatches).toEqual(16);
    });
});

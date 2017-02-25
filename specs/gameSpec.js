import board from '../src/js/board';
import view from '../src/js/view';
import game from '../src/js/game';

describe('game suite', function() {
    beforeAll(function() {
        board.init();
    });

    beforeEach(function() {
        game.restart();
    });

    it('should handle click event', function() {
        let numberToMove = board.getCell(3, 0);
        let clickedCell = $(`<div id="cell_${numberToMove}">${numberToMove}</div>`);
        clickedCell.click(game.handleClick.bind(game));
        clickedCell.trigger('click');
        expect(board.getCell(3, 0)).toBe(0);
    });

    it('should check for game was finished', function() {
        function setBoard(numberOrder = []) {
            let counter = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (counter < numberOrder.length) {
                        board.setCell(i, j, numberOrder[counter]);
                    }
                    counter++;
                }
            }
        }

        expect(game.isGameOver()).toBeFalsy();
        setBoard([0, 1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 13, 14, 15]);
        expect(game.isGameOver()).toBeFalsy();
        setBoard([1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 0, 10, 11, 13, 14]);
        expect(game.isGameOver()).toBeFalsy();
        setBoard([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        expect(game.isGameOver()).toBeTruthy();
        setBoard([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]);
        expect(game.isGameOver()).toBeTruthy();
        setBoard([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 12, 13, 14, 15]);
        expect(game.isGameOver()).toBeTruthy();
    });
});

import board from './board';
import view from './view';

let moveCounter = 0;

const game = {
    init() {
        board.init();
        $(window).click(() => {
            if (view.isPopup()) {
                view.closeWinPopup();
            }
        });
        $('#restart_btn').click(this.restart.bind(this));
        this.restart();
    },
    restart() {
        view.destroy();
        board.shuffle();
        view.fill();
        moveCounter = 0;
        view.updateMoveStats(moveCounter);
    },
    handleClick(event) {
        event.stopPropagation();
        let number = parseInt(event.target.id.substr(5));
        let direction = board.getDirectionForMoving(number);
        let cellsToMove = board.getCellsToMove(number);
        if (board.move(cellsToMove)) {
            cellsToMove.forEach((el) => { view.move(el, direction) });
            view.updateMoveStats(++moveCounter);
            if (this.isGameOver()) {
                setTimeout(view.showWinPopup.bind(view), 400);
            }
        }
    },
    isGameOver() {
        let numbers = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                numbers.push(board.getCell(i, j));
            }
        }

        return numbers.every((el, index, arr) => {
            if (el && index) {
                let previous = index - 1 && !arr[index - 1] ?
                    arr[index - 2] :
                    arr[index - 1];
                return el > previous;
            }
            return true;
        });
    }
}

export default game;

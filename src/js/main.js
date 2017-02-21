import board from './board';
import view from './view';

$(() => {
    board.init();
    board.print();
    board.shuffle();
    board.print();
    view.fill();
});

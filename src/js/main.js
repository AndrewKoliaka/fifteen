import board from './board';
import view from './view';

$(() => {
    board.init();
    board.shuffle();
    view.fill();
    board.print();
    view.move(1, 'down')
});

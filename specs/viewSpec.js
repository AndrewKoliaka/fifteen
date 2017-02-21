import view from '../src/js/view';
import board from '../src/js/board';

describe('view suite', function() {
    beforeAll(function() {
        $('<main></main>').appendTo(document.body);
    });

    beforeEach(function() {
        board.init();
        board.shuffle();
        view.fill();
    });

    it('should fill the playground', function() {
        let cells = $('.cell');
        expect(cells.length).toEqual(15);
    });

    it('should destroy cells in playground', function() {
        view.destroy();
        expect($('.cell').length).toEqual(0);
    });

    it('should move cell', function() {
        let firstCell = $($('.cell').get(0));
        let number = firstCell.attr('id').substr(5);
        view.move(number, 'down');
        expect(firstCell.css('top')).toEqual('100px');
        view.move(number, 'up');
        expect(firstCell.css('top')).toEqual('0px');
        view.move(number, 'right');
        expect(firstCell.css('left')).toEqual('100px');
        view.move(number, 'left');
        expect(firstCell.css('left')).toEqual('0px');
    });
});

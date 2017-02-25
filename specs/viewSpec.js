import view from '../src/js/view';
import board from '../src/js/board';

describe('view suite', function() {
    beforeAll(function() {
        $(`<main>
            <div id="game_stats">
                <button id="restart_btn">Restart</button>
                <div id="moves">Moves: <span id="moves_number">0</span></div>
            </div>
            <div id="playground"></div>
            </main>`).appendTo(document.body);
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
        const duration = 200;
        let firstCell = $($('.cell').get(0));
        let number = firstCell.attr('id').substr(5);
        spyOn(jQuery.prototype, 'animate');
        //move down
        view.move(number, 'down');
        expect(jQuery.prototype.animate).toHaveBeenCalledWith({ top: '+=100px' }, duration)
        setTimeout(() => {
            expect(firstCell.css('top')).toEqual('100px');
        }, duration);
        //move up
        view.move(number, 'up');
        expect(jQuery.prototype.animate).toHaveBeenCalledWith({ top: '-=100px' }, duration)
        setTimeout(() => {
            expect(firstCell.css('top')).toEqual('0px');
        }, duration);
        //move right
        view.move(number, 'right');
        expect(jQuery.prototype.animate).toHaveBeenCalledWith({ left: '+=100px' }, duration)
        setTimeout(() => {
            expect(firstCell.css('left')).toEqual('100px');
        }, duration);
        //move left
        view.move(number, 'left');
        expect(jQuery.prototype.animate).toHaveBeenCalledWith({ left: '-=100px' }, duration)
        setTimeout(() => {
            expect(firstCell.css('left')).toEqual('0px');
        }, duration);
    });

    describe('popup suite', function() {
        beforeEach(function() {
            $('#popup').remove();
        });

        it('should check is popup visible', function() {
            expect(view.isPopup()).toBeFalsy();
            view.showWinPopup();
            expect(view.isPopup()).toBeTruthy();
        });

        it('should show win popup', function() {
            view.showWinPopup();
            view.showWinPopup();
            expect($('#popup').length).toBe(1);
        });

        it('should close win popup', function() {
            view.showWinPopup();
            view.closeWinPopup();
            expect($('#popup').length).toBe(1);
        });
    });

    it('should update moves score', function() {
        view.updateMoveStats(1);
        expect($('#moves_number').text()).toBe('1');
    });
});

import board from './board';
import game from './game';

const view = {
    fill() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let number = board.getCell(i, j);
                if (number) {
                    let cell = $(`<div id="cell_${number}" class="cell">${number}</div>`).hide();
                    cell.click(game.handleClick.bind(game))
                    cell.appendTo('#playground').fadeIn(400);
                }
            }
        }
    },
    destroy() {
        $('.cell').remove();
    },
    move(number, direction) {
        let cell = $('#cell_' + number);
        switch (direction) {
            case 'up':
                cell.animate({ top: '-=100px' }, 200);
                break;
            case 'right':
                cell.animate({ left: '+=100px' }, 200);
                break;
            case 'down':
                cell.animate({ top: '+=100px' }, 200);
                break;
            case 'left':
                cell.animate({ left: '-=100px' }, 200);
                break;
        }
    },
    showWinPopup() {
        if (this.isPopup()) {
            return false;
        }
        let popup = $(`<div id="popup">
            <div id="popup_content">
                <div id="close_btn">&#10006</div>
                <div>Congratulations,<br> you solved puzzle!</div>
            </div>
        </div>`).hide();
        $('#close_btn').click(() => {
            this.closeWinPopup();
        });
        popup.appendTo($('#playground')).fadeIn();
    },
    closeWinPopup() {
        $('#popup').fadeOut(() => {
            $('#popup').remove();
        });
    },
    updateMoveStats(moves) {
        $('#moves_number').text(moves);
    },
    isPopup() {
        return Boolean($('#popup').length);
    }
}

export default view;

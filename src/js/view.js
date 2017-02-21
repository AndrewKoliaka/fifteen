import board from './board';

let view = {
    fill() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let number = board.getCell(i, j);
                if (number) {
                    let cell = $(`<div id="cell_${number}" class="cell">${number}</div>`);
                    cell.appendTo('main');
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
                cell.css('top', '-=100px');
                break;
            case 'right':
                cell.css('left', '+=100px');
                break;
            case 'down':
                cell.css('top', '+=100px');
                break;
            case 'left':
                cell.css('left', '-=100px');
                break;
        }
    }
}

export default view;

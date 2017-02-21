let _board = [];

let board = {
    init() {
        for (let i = 0; i < 4; i++) {
            _board.push(new Array(4).fill(0));
        }
    },
    shuffle() {
        let numbers = [];
        for (let i = 0; i < 16; i++) {
            numbers.push(i);
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let random = Math.floor(Math.random() * numbers.length);
                _board[i][j] = numbers.splice(random - 1, 1)[0];
            }
        }
    },
    getCell(i, j) {
        return _board[i][j];
    },
    print() {
        let str = '';
        for (let i = 0; i < 4; i++) {
            str += _board[i].toString() + '\n';
        }
        console.log(str);
    }
}

export default board;

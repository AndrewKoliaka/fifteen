(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _board = null;

function swap(number1, number2) {
    var coord1 = board.getCoord(number1);
    var coord2 = board.getCoord(number2);
    if (coord1 && coord2) {
        board.setCell(coord1.i, coord1.j, number2);
        board.setCell(coord2.i, coord2.j, number1);
    }
}

var board = {
    init: function init() {
        _board = [];
        for (var i = 0; i < 4; i++) {
            _board.push(new Array(4).fill(0));
        }
    },
    shuffle: function shuffle() {
        var numbers = [];
        for (var i = 1; i < 16; i++) {
            numbers.push(i);
        }

        for (var _i = 0; _i < 4; _i++) {
            for (var j = 0; j < 4; j++) {
                if (!numbers.length) {
                    this.setCell(_i, j, 0);
                    break;
                }
                var random = Math.floor(Math.random() * numbers.length);
                this.setCell(_i, j, numbers.splice(random - 1, 1)[0]);
            }
        }
    },
    getCell: function getCell(i, j) {
        return _board[i][j];
    },
    setCell: function setCell(i, j) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _board[i][j] = value;
    },
    getCoord: function getCoord() {
        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var coord = null;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.getCell(i, j) === number) {
                    return coord = { i: i, j: j };
                }
            }
        }
        return coord;
    },
    getDirectionForMoving: function getDirectionForMoving(number) {
        if (!number || !Number.isInteger(number)) {
            return null;
        }
        var zeroCoord = this.getCoord(0);
        var numberCoord = this.getCoord(number);

        if (numberCoord.i === zeroCoord.i) {
            return numberCoord.j > zeroCoord.j ? 'left' : 'right';
        } else if (numberCoord.j === zeroCoord.j) {
            return numberCoord.i > zeroCoord.i ? 'up' : 'down';
        }
        return null;
    },
    getCellsToMove: function getCellsToMove(number) {
        if (!Number.isInteger(number)) {
            return null;
        }
        var numberCoord = this.getCoord(number);
        var zeroCoord = this.getCoord(0);
        var cellsToMove = [];
        if (numberCoord.i === zeroCoord.i) {
            if (this.getDirectionForMoving(number) === 'right') {
                for (var j = numberCoord.j; j < zeroCoord.j; j++) {
                    cellsToMove.push(this.getCell(numberCoord.i, j));
                }
            } else {
                for (var _j = numberCoord.j; _j > zeroCoord.j; _j--) {
                    cellsToMove.push(this.getCell(numberCoord.i, _j));
                }
            }
        } else if (numberCoord.j === zeroCoord.j) {
            if (this.getDirectionForMoving(number) === 'down') {
                for (var i = numberCoord.i; i < zeroCoord.i; i++) {
                    cellsToMove.push(this.getCell(i, numberCoord.j));
                }
            } else {
                for (var _i2 = numberCoord.i; _i2 > zeroCoord.i; _i2--) {
                    cellsToMove.push(this.getCell(_i2, numberCoord.j));
                }
            }
        }
        return cellsToMove;
    },
    move: function move() {
        var numbers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (!Array.isArray(numbers) || !numbers.every(function (el) {
            return Number.isInteger(el);
        })) {
            return false;
        }
        var self = this;
        var direction = this.getDirectionForMoving(numbers[0]);
        if (!direction || !numbers.every(function (el) {
            return self.getDirectionForMoving(el) === direction;
        })) {
            return false;
        }
        for (var i = numbers.length - 1; i >= 0; i--) {
            swap(numbers[i], 0);
        }
        return true;
    }
};

exports.default = board;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveCounter = 0;

var game = {
    init: function init() {
        _board2.default.init();
        $(window).click(function () {
            if (_view2.default.isPopup()) {
                _view2.default.closeWinPopup();
            }
        });
        $('#restart_btn').click(this.restart.bind(this));
        this.restart();
    },
    restart: function restart() {
        _view2.default.destroy();
        _board2.default.shuffle();
        _view2.default.fill();
        moveCounter = 0;
        _view2.default.updateMoveStats(moveCounter);
    },
    handleClick: function handleClick(event) {
        event.stopPropagation();
        var number = parseInt(event.target.id.substr(5));
        var direction = _board2.default.getDirectionForMoving(number);
        var cellsToMove = _board2.default.getCellsToMove(number);
        if (_board2.default.move(cellsToMove)) {
            cellsToMove.forEach(function (el) {
                _view2.default.move(el, direction);
            });
            _view2.default.updateMoveStats(++moveCounter);
            if (this.isGameOver()) {
                setTimeout(_view2.default.showWinPopup.bind(_view2.default), 400);
            }
        }
    },
    isGameOver: function isGameOver() {
        var numbers = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                numbers.push(_board2.default.getCell(i, j));
            }
        }

        return numbers.every(function (el, index, arr) {
            if (el && index) {
                var previous = index - 1 && !arr[index - 1] ? arr[index - 2] : arr[index - 1];
                return el > previous;
            }
            return true;
        });
    }
};

exports.default = game;

},{"./board":1,"./view":4}],3:[function(require,module,exports){
'use strict';

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    _game2.default.init();
});

},{"./board":1,"./game":2,"./view":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = {
    fill: function fill() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var number = _board2.default.getCell(i, j);
                if (number) {
                    var cell = $('<div id="cell_' + number + '" class="cell">' + number + '</div>').hide();
                    cell.click(_game2.default.handleClick.bind(_game2.default));
                    cell.appendTo('#playground').fadeIn(400);
                }
            }
        }
    },
    destroy: function destroy() {
        $('.cell').remove();
    },
    move: function move(number, direction) {
        var cell = $('#cell_' + number);
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
    showWinPopup: function showWinPopup() {
        var _this = this;

        if (this.isPopup()) {
            return false;
        }
        var popup = $('<div id="popup">\n            <div id="popup_content">\n                <div id="close_btn">&#10006</div>\n                <div>Congratulations,<br> you solved puzzle!</div>\n            </div>\n        </div>').hide();
        $('#close_btn').click(function () {
            _this.closeWinPopup();
        });
        popup.appendTo($('#playground')).fadeIn();
    },
    closeWinPopup: function closeWinPopup() {
        $('#popup').fadeOut(function () {
            $('#popup').remove();
        });
    },
    updateMoveStats: function updateMoveStats(moves) {
        $('#moves_number').text(moves);
    },
    isPopup: function isPopup() {
        return Boolean($('#popup').length);
    }
};

exports.default = view;

},{"./board":1,"./game":2}]},{},[3]);

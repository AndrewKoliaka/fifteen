(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _board = [];

var board = {
    init: function init() {
        for (var i = 0; i < 4; i++) {
            _board.push(new Array(4).fill(0));
        }
    },
    shuffle: function shuffle() {
        var numbers = [];
        for (var i = 0; i < 16; i++) {
            numbers.push(i);
        }

        for (var _i = 0; _i < 4; _i++) {
            for (var j = 0; j < 4; j++) {
                var random = Math.floor(Math.random() * numbers.length);
                _board[_i][j] = numbers.splice(random - 1, 1)[0];
            }
        }
    },
    getCell: function getCell(i, j) {
        return _board[i][j];
    },
    print: function print() {
        var str = '';
        for (var i = 0; i < 4; i++) {
            str += _board[i].toString() + '\n';
        }
        console.log(str);
    }
};

exports.default = board;

},{}],2:[function(require,module,exports){
'use strict';

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    _board2.default.init();
    _board2.default.print();
    _board2.default.shuffle();
    _board2.default.print();
    _view2.default.fill();
});

},{"./board":1,"./view":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = {
    fill: function fill() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var number = _board2.default.getCell(i, j);
                if (number) {
                    var cell = $('<div id="cell_' + number + '" class="cell">' + number + '</div>');
                    cell.appendTo('main');
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
};

exports.default = view;

},{"./board":1}]},{},[2]);

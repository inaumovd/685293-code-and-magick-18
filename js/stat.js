'use strict';
var RECT_HEIGHT = 270;
var RECT_WIDTH = 420;
var RECT_COORD_X = 100;
var RECT_COORD_Y = 10;
var SHADOW_GAP = 10;
var TEXT_COORD_X = 180;
var TEXT_COORD_Y = 40;
var TEXT_GAP = 20;
var NAMES_COLOR = '#000';
var NAMES_COORD_X = 140;
var NAMES_COORD_Y = 265;
var NAMES_GAP = 100;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = '#fff';
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';
var COLUMN_COORD_X = 140;
var COLUMN_COORD_Y = 80;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMNS_GAP = 100;
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

var renderNames = function (ctx, names) {
  var gap = 0;
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'NAMES_COLOR';
    ctx.fillText(names[i], NAMES_COORD_X + gap, NAMES_COORD_Y);
    gap =  gap + NAMES_GAP;
  }
};

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, color, font, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var getMaxTime = function (times) {
  var max = 0;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > max) {
      max = (times[i]);
    }
  }
  return Math.round(max);
};

var getRandomBlue = function () {
  var random = Math.random();
  random.toFixed(2);
  return 'rgba(34, 0, 255, ' + random.toFixed(2) + ')';
}

var renderColumns = function (ctx, times, names) {
  var gap = 0;
  var color;
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      color = PLAYER_COLUMN_COLOR;
    } else {
      color = getRandomBlue();
    }
    ctx.fillStyle = color;
    ctx.fillRect(COLUMN_COORD_X + gap, COLUMN_COORD_Y + (COLUMN_MAX_HEIGHT - (COLUMN_MAX_HEIGHT * (times[i] / getMaxTime(times)))), COLUMN_WIDTH, COLUMN_MAX_HEIGHT * (times[i] / getMaxTime(times)));
    gap = gap + COLUMNS_GAP;
  }
}

window.renderStatistics = function(ctx, names, times) {

  renderCloud (ctx, RECT_COORD_X + SHADOW_GAP, RECT_COORD_Y + SHADOW_GAP, RECT_WIDTH, RECT_HEIGHT, SHADOW_COLOR);
  renderCloud (ctx, RECT_COORD_X, RECT_COORD_Y, RECT_WIDTH, RECT_HEIGHT, CLOUD_COLOR);

  renderText (ctx,"Ура вы победили!", TEXT_COLOR, TEXT_FONT, TEXT_COORD_X, TEXT_COORD_Y);
  renderText (ctx,"Список результатов:", TEXT_COLOR, TEXT_FONT, TEXT_COORD_X, TEXT_COORD_Y + TEXT_GAP);

  renderNames(ctx, names);

  renderColumns(ctx, times, names, TEXT_COLOR);
};

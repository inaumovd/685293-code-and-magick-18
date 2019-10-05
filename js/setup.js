'use strict';

var NUMBER_OF_WIZARDS = 4;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
var wizardsList = document.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

var getRandomItem = function (array) {
  var randNumber = Math.floor(Math.random() * array.length);
  return array[randNumber];
}

var getRandomName = function (names, surnames) {
  var name = getRandomItem(names) + ' ' + getRandomItem(surnames);
  return name;
}

var getWizardsArray = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: getRandomName(names, surnames),
      coatColor: getRandomItem(coatColors),
      eyesColor: getRandomItem(eyeColors)
    };
    wizards.push(wizard);
  }
  return wizards;
}

var wizards = getWizardsArray(NUMBER_OF_WIZARDS);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderFragment = function (wizards) {
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

renderFragment(wizards);

wizardsList.classList.remove('hidden');

//События
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupName = document.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('keydown', onCloseButtonEnterPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  setupClose.removeEventListener('keydown', onCloseButtonEnterPress);
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onCloseButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var onSetupButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpen.addEventListener('keydown', onSetupButtonEnterPress);

setupName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

//кастомизация волшебника

var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

setupWizard.querySelector('.wizard-coat').addEventListener('click', function () {
  var randomColor = getRandomItem(WIZARD_COAT_COLOR);
  setupWizard.querySelector('.wizard-coat').style.fill = randomColor;
  document.querySelector('input[name = coat-color]').value = randomColor;
});

setupWizard.querySelector('.wizard-eyes').addEventListener('click', function () {
  var randomColor = getRandomItem(WIZARD_EYES_COLOR);
  setupWizard.querySelector('.wizard-eyes').style.fill = randomColor;
  document.querySelector('input[name = eyes-color]').value = randomColor;
});

document.querySelector('.setup-fireball-wrap').addEventListener('click', function () {
  var randomColor = getRandomItem(WIZARD_FIREBALL_COLOR);
  document.querySelector('.setup-fireball-wrap').style.backgroundColor = randomColor;
  document.querySelector('input[name = fireball-color]').value = randomColor;
});

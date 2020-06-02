import {DnD} from './dnd';

export class Note {
  constructor(button ,buttonColor) {
    this.data = [];
    this.container = document.querySelector('.container'); // контейнер, нужен для изоляции заметок от остального html
    this.button = button;
    this.buttonColor = buttonColor;

    this._handleClickButton = this._clickButton.bind(this);
    this._handleClickChangeColor = this._clickChangeColor.bind(this);
    this.setCoords = this._setCoords.bind(this);

    this._init();
  }

  _init() {
    this.button.addEventListener('click', this._handleClickButton);
    this.buttonColor.addEventListener('click', this._handleClickChangeColor);
  }

  // метод для записи координат в data, передаём его в класс DnD
  _setCoords(note, coords) {
    const index = note.getAttribute('data-index');

    this.data[index].left = coords.x;
    this.data[index].top = coords.y;
    console.log(this.data); // если вызвать в контексте класса Note в другом классе, есть доступ к data
  }

  _constructorNote(content, top, left) {
    return {
      content,
      top,
      left
    }
  }

  _clickButton() {
    const newNoteObj = this._constructorNote('Hello', 48, 24); // передаём дефолтные значения
    this.data.push(newNoteObj);

    this.render();
  }

  _clickChangeColor() {
    const changeBgColor = document.querySelector('.note');

    if (this.buttonColor.classList.value.includes('text-info')){
        this.buttonColor.classList.remove('text-info');
        this.buttonColor.classList.add('text-danger');
        changeBgColor.style.background = 'rgb(214, 40, 40)';
    } else {
        this.buttonColor.classList.add('text-info');
        this.buttonColor.classList.remove('text-danger');
        changeBgColor.style.background = 'rgba(121, 149, 187, 0.883)';
    }
  }

  _createNote(data, index) {
    const [divNode, buttonNode, textAreaNode] = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('textarea'),
    ]

    const noteNode = divNode.cloneNode(true);
    noteNode.setAttribute('data-index', index); // index нужен, чтобы найти объект в массиве data
    noteNode.classList.add('note');
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left: ${data.left}px;`;
    new DnD(noteNode, this.setCoords);

    const btnCloseNode = buttonNode.cloneNode(true);
    btnCloseNode.classList.add('note__close');
    btnCloseNode.innerHTML = '<i class="fas fa-times fa-2x pt-2 pr-2 pb-2 id="closeNode""></i>';

    const contentNode = textAreaNode.cloneNode(true);
    contentNode.classList.add('note__content');
    contentNode.innerHTML = data.content;

    noteNode.append(btnCloseNode, contentNode)

    return noteNode;
  }

  render() {
    this.container.innerHTML = ''; 

    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index);

      this.container.append(noteNode);
    })
  }
}
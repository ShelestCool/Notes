import { DnD } from "./dnd";
import imgSrc from "../img/btn.png";

export class Note {
  constructor(button) {
    this.data = [];
    this.container = document.querySelector(".container"); // контейнер, нужен для изоляции заметок от остального html
    this.button = button;
    this.btnChacngeColor = document.querySelector("#changeColorNote");

    this._handleClickButton = this._clickButton.bind(this);
    this.setCoords = this._setCoords.bind(this);

    this._init();
  }

  _init() {
    this.button.addEventListener("click", this._handleClickButton);
  }

  // метод для записи координат в data, передаём его в класс DnD
  _setCoords(note, coords) {
    const index = note.getAttribute("data-index");

    this.data[index].left = coords.x;
    this.data[index].top = coords.y;
    console.log(this.data); // если вызвать в контексте класса Note в другом классе, есть доступ к data
  }

  _constructorNote(content, top, left, color) {
    return {
      content,
      top,
      left,
      color,
    };
  }

  _clickButton() {
    const color = this.btnChacngeColor.value;
    const newNoteObj = this._constructorNote("Hello", 48, 24, color); // передаём дефолтные значения
    this.data.push(newNoteObj);

    this.render();
  }

  _clickCloseNote(index) {
    this.data.splice(index, 1);
    this.render();
  }

  _editNote(textareaNode, contentNode, index) {
    if (textareaNode.hidden) {
      textareaNode.hidden = false;
      contentNode.hidden = true;
    } else {
      textareaNode.hidden = true;
      contentNode.hidden = false;
      this.data[index].content = textareaNode.value;

      this.render();
    }
  }

  _createNote(data, index) {
    const [divNode, buttonNode, textareaNode] = [
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("textarea"),
    ];

    const noteNode = divNode.cloneNode(true);
    noteNode.setAttribute("data-index", index); // index нужен, чтобы найти объект в массиве data
    noteNode.classList.add("note");
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left: ${data.left}px; background-color: ${data.color}`;
    new DnD(noteNode, this.setCoords);
    noteNode.addEventListener("dblclick", () => {
      this._editNote(textareaNode, contentNode, index);
    });

    const topContentNode = divNode.cloneNode(true);
    topContentNode.classList.add("note__topContent");

    const btnCloseNode = buttonNode.cloneNode(true);
    btnCloseNode.classList.add("note__close");
    btnCloseNode.innerHTML =
      '<i class="fas fa-times fa-2x id="closeNode""></i>';
    btnCloseNode.addEventListener("click", () => {
      this._clickCloseNote(index);
    });

    const contentNode = divNode.cloneNode(true);
    contentNode.classList.add("note__content");
    contentNode.innerHTML = data.content;

    textareaNode.classList.add("note__textarea");
    textareaNode.hidden = true;
    textareaNode.value = data.content;

    const imgTopNote = document.createElement("img");
    imgTopNote.classList.add("note__img");
    imgTopNote.src = imgSrc;

    noteNode.append(topContentNode, contentNode, textareaNode);
    topContentNode.append(btnCloseNode, imgTopNote);

    return noteNode;
  }

  render() {
    this.container.innerHTML = "";

    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index);

      this.container.append(noteNode);
    });
  }
}

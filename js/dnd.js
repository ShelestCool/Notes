export class DnD {
  constructor(elem, methodSetCoords) {
    this.elem = elem;
    this.methodSetCoords = methodSetCoords || null;

    this._handleMouseDown = this._mouseDown.bind(this);
    this._handleMouseUp = this._mouseUp.bind(this);
    this._handleMouseMove = this._mouseMove.bind(this);

    this._init();
  }

  _init() {
    this._setPositionAbsolute();

    this.elem.addEventListener("mousedown", this._handleMouseDown);
  }

  _setPositionAbsolute() {
    this.elem.style.position = "absolute";
  }

  _mouseDown(event) {
    const elemRect = this.elem.getBoundingClientRect();

    this.shiftX = event.clientX - elemRect.left;
    this.shiftY = event.clientY - elemRect.top;
    this._trackMouse(event.pageX, event.pageY);

    document.addEventListener("mousemove", this._handleMouseMove);
    document.addEventListener("mouseup", this._handleMouseUp);
  }

  _mouseUp() {
    document.removeEventListener("mousemove", this._handleMouseMove);
    document.removeEventListener("mouseup", this._handleMouseUp);

    if (this.methodSetCoords != null) {
      this.methodSetCoords(this.elem, { x: this.left, y: this.top });
    }

    this.elem.classList.remove("moved");
    this.elem.classList.add("getUp");
  }

  _mouseMove(event) {
    this._trackMouse(event.pageX, event.pageY);

    this.elem.classList.add("moved");
    this.elem.classList.remove("getUp");
  }

  _trackMouse(pageX, pageY) {
    this.left = pageX - this.shiftX;
    this.top = pageY - this.shiftY;

    this.elem.style.left = this.left + "px";
    this.elem.style.top = this.top + "px";
  }
}

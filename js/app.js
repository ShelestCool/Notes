import {Note} from './note';

const newNoteBtnNode = document.querySelector('#newNoteBtn');
const changeColorNote = document.querySelector('#changeColorNote');

new Note(newNoteBtnNode, changeColorNote);
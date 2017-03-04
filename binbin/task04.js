'use strict';

let input = document.getElementById('input');
let buttonInsertLeft = document.getElementById('insert-left');
let buttonInsertRight = document.getElementById('insert-right');
let buttonRemoveLeft = document.getElementById('remove-left');
let buttonRemoveRight = document.getElementById('remove-right');
let numberContainer = document.getElementById('number-container');

function newNode(tagName, className, text) {
	let node = document.createElement(tagName);
	node.className = className;
	node.innerText = text;
	return node;
}

function newNumberNode(number) {
	return newNode('span', 'number', number.toString());
}

function getInputNumber() {
	return parseInt(input.value);
}

function clearInput() {
	input.value = '';
}

function insertNumber(f) {
	const number = getInputNumber();
	if (Number.isNaN(number)) {
		alert('Not a number.');
	} else {
		f(number);
		input.value = '';
	}

	input.focus();
}

function removeNumber(f) {
	if (numberContainer.children.length == 0) {
		alert('Empty!');
	} else {
		const node = f();
		alert(node.innerText);
		node.parentNode.removeChild(node);
	}

	input.focus();
}

function doInsertLeft() {
	insertNumber((n) => numberContainer.insertBefore(newNumberNode(n), numberContainer.firstElementChild));
}

function doInsertRight() {
	insertNumber((n) => numberContainer.appendChild(newNumberNode(n)));
}

function doRemoveLeft() {
	removeNumber(() => numberContainer.firstElementChild);
}

function doRemoveRight() {
	removeNumber(() => numberContainer.lastElementChild);
}

function addClickListener(b, f) {
	b.addEventListener('click', f);
}

addClickListener(buttonInsertLeft, doInsertLeft);
addClickListener(buttonInsertRight, doInsertRight);
addClickListener(buttonRemoveLeft, doRemoveLeft);
addClickListener(buttonRemoveRight, doRemoveRight);

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
		f(numberContainer, number);
		input.value = '';
	}

	input.focus();
}

function removeNumber(f) {
	if (numberContainer.children.length == 0) {
		alert('Empty!');
	} else {
		const node = f(numberContainer);
		alert(node.innerText);
		node.parentNode.removeChild(node);
	}

	input.focus();
}

const doInsertLeft =  () => insertNumber((c,n) => c.insertBefore(newNumberNode(n), c.firstElementChild));
const doInsertRight = () => insertNumber((c,n) => c.appendChild(newNumberNode(n)));
const doRemoveLeft =  () => removeNumber((c)   => c.firstElementChild);
const doRemoveRight = () => removeNumber((c)   => c.lastElementChild);

const addClickListener = (b,f) => b.addEventListener('click', f);
addClickListener(buttonInsertLeft, doInsertLeft);
addClickListener(buttonInsertRight, doInsertRight);
addClickListener(buttonRemoveLeft, doRemoveLeft);
addClickListener(buttonRemoveRight, doRemoveRight);

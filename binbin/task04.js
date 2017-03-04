'use strict';

let input = document.getElementById('input');
let buttons = new Map([
	['insertLeft','insert-left'],
	['insertRight','insert-right'],
	['removeLeft','remove-left'],
	['removeRight','remove-right']].map(
		([o,t]) => [o,document.getElementById(t)]));
let numberContainer = document.getElementById('number-container');

const newNode = (tagName, className, text)  => {
	let node = document.createElement(tagName);
	node.className = className;
	node.innerText = text;
	return node;
};

const newNumberNode = (n) => newNode('span', 'number', n.toString());
const getInputNumber = () => parseInt(input.value);
const clearInput = () => {input.value = ''};

const insertNumber = (f) => {
	const number = getInputNumber();
	if (Number.isNaN(number)) {
		alert('Not a number.');
	} else {
		f(numberContainer, number);
		input.value = '';
	}

	input.focus();
};

const removeNumber = (f) => {
	if (numberContainer.children.length == 0) {
		alert('Empty!');
	} else {
		const node = f(numberContainer);
		alert(node.innerText);
		node.parentNode.removeChild(node);
	}

	input.focus();
};

const actions = new Map([
	['insertLeft',  () => insertNumber((c,n) => c.insertBefore(newNumberNode(n), c.firstElementChild))],
	['insertRight', () => insertNumber((c,n) => c.appendChild(newNumberNode(n)))],
	['removeLeft',  () => removeNumber((c)   => c.firstElementChild)],
	['removeRight', () => removeNumber((c)   => c.lastElementChild)],
]);

['insertLeft', 'insertRight', 'removeLeft', 'removeRight'].forEach(
		(b) => buttons.get(b).addEventListener('click', actions.get(b)));

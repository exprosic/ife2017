'use strict';

let input = document.getElementById('input');
let buttonInsertLeft = document.getElementById('insert-left');
let buttonInsertRight = document.getElementById('insert-right');
let buttonRemoveLeft = document.getElementById('remove-left');
let buttonRemoveRight = document.getElementById('remove-right');
let numberContainer = document.getElementById('number-container');

const newNode = (tagName, className, text)  => {
	let node = document.createElement(tagName);
	node.className = className;
	node.innerText = text;
	return node;
}

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
}

const removeNumber = (f) => {
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

[[buttonInsertLeft, doInsertLeft],
 [buttonInsertRight, doInsertRight],
 [buttonRemoveLeft, doRemoveLeft],
 [buttonRemoveRight, doRemoveRight]].forEach(
	 ([b,f]) => b.addEventListener('click', f));

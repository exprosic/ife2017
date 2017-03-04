'use strict';

let input = document.getElementById('input');
const buttonNames = ['sort', 'insert-left', 'insert-right', 'remove-left', 'remove-right'];
let buttons = new Map(buttonNames.map((x) => [x,document.getElementById(x)]));
let numberContainer = document.getElementById('number-container');

const getInputNumber = () => parseInt(input.value);
const clearInput = () => {input.value = ''};
const setHeight = (node,h) => node.setAttribute('data-height', h.toString());
const getHeight = (node) => parseInt(node.getAttribute('data-height'));

const newNumberNode = (n) => {
	let node = document.createElement('span');
	node.className = 'number';
	setHeight(node, n);
	return node;
};

const insertNumber = (f) => {
	const number = getInputNumber();
	if (Number.isNaN(number)) {
		alert('Not a number.');
	} else if (numberContainer.children.length >= 60) {
		alert('Too much elements already.');
	} else if (!(10<=number && number<=100)) {
		alert('Number not in [10,100]');
	} else {
		const node = newNumberNode(number);
		renderNode(node);
		f(numberContainer, node);
		input.value = '';
	}

	input.focus();
};

const removeNumber = (f) => {
	if (numberContainer.children.length == 0) {
		alert('Empty!');
	} else {
		const node = f(numberContainer);
		alert(getHeight(node).toString());
		node.parentNode.removeChild(node);
	}

	input.focus();
};

const renderNode = (node) => {
	const n = getHeight(node);
	node.style.height = (n).toString()*3 + 'px';
};

const sortNodes = () => {
	let numbers = Array.from(numberContainer.children);
	mySort(numbers, (a,b) => (getHeight(a) - getHeight(b)));
	for (let i=0; i<numbers.length; ++i) {
		numberContainer.appendChild(numbers[i]);
	}
	input.focus();
};

//const mySort = (a,c) => a.sort(c);
const mySort = (a,c) => {
	for (let i=0; i<a.length; ++i) {
		for (let j=i+1; j<a.length; ++j) {
			if (c(a[i],a[j]) > 0) {
				[a[i],a[j]] = [a[j],a[i]];
			}
		}
	}
};

const actions = new Map([
	['sort', sortNodes],
	['insert-left',  () => insertNumber((c,n) => c.insertBefore(n, c.firstElementChild))],
	['insert-right', () => insertNumber((c,n) => c.appendChild(n))],
	['remove-left',  () => removeNumber((c)   => c.firstElementChild)],
	['remove-right', () => removeNumber((c)   => c.lastElementChild)],
]);

window.onload = () => {
	for (let i=numberContainer.childNodes.length-1; i>=0; --i) {
		let node = numberContainer.childNodes[i];
		if (node.nodeType === Node.TEXT_NODE) {
			numberContainer.removeChild(node);
		} else {
			renderNode(node);
		}
	}

	for (const b of buttonNames) {
		buttons.get(b).addEventListener('click', actions.get(b));
	}

	input.focus();
};

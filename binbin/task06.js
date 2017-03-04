'use strict';

let input = document.getElementById('input');
let queryInput = document.getElementById('query-input');
const buttonNames = ['query', 'clear', 'insert-left', 'insert-right', 'remove-left', 'remove-right'];
let buttons = new Map(buttonNames.map((t) => [t,document.getElementById(t)]));
let textContainer = document.getElementById('text-container');

const newTextNode = (text)  => {
	let node = document.createElement('span');
	node.className = 'text';
	node.innerText = text;
	return node;
};

const insertText = (f) => {
	const texts = input.value.split(/[\s,]+/).filter((s) => s!=='');
	f(textContainer, texts);
	input.value = '';
	input.focus();
};

const removeText = (f) => {
	if (textContainer.children.length == 0) {
		alert('Empty!');
	} else {
		const node = f(textContainer);
		alert(node.innerText);
		node.parentNode.removeChild(node);
	}

	input.focus();
};

const doQuery = () => {
	const pattern = queryInput.value;
	if (pattern === '')
		return;

	clearMarks();
	for (const child of textContainer.children) {
		if (child.innerText.indexOf(pattern) >= 0)
			setMark(child);
	}

	queryInput.value = '';
	queryInput.focus();
}

const setMark = (node) => {
	node.className += ' marked';
}

const clearMarks = () => {
	for (const child of textContainer.children) {
		const classes = child.className.split(/\s+/);
		child.className = classes.filter((c) => c!=='marked').join(' ');
	}
}

const actions = new Map([
	['insert-left',  () => insertText(
		(c,ts) => {for (const t of ts.reverse()) c.insertBefore(newTextNode(t), c.firstElementChild);})],
	['insert-right', () => insertText(
		(c,ts) => {for (const t of ts) c.appendChild(newTextNode(t));})],
	['remove-left',  () => removeText((c)   => c.firstElementChild)],
	['remove-right', () => removeText((c)   => c.lastElementChild)],
	['query', doQuery],
	['clear', clearMarks],
]);

window.onload = () => {
	for (const b of buttonNames)
		buttons.get(b).addEventListener('click', actions.get(b));
};

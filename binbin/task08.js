window.onload = () => {
	const root = ['Super',['Car', ['Apple', ['Pear'],['Pig'],['Cola'],['Soccer']],
								  ['Phone'],
								  ['', ['Book'], ['School']]],
						  ['Note', ['Human', ['Code'], ['Operate'], ['Man']],
								   ['Program', ['Element', ['Cat']], ['Glass']]],
						  ['Fish']];

	const renderTree = (x) => {
		const node = document.createElement('div');
		node.className = 'node';
		node.appendChild(document.createTextNode(x[0]));
		for (const child of x.slice(1))
			node.appendChild(renderTree(child));
		return node;
	};

	const visit = (node) => node.classList.add('visiting');
	const unVisit = (node) => node.classList.remove('visiting');
	const setMark = (node) => node.classList.add('marked');
	const clearMark = (node) => node.classList.remove('marked');

	const doTraverse = (order) => async function(f) {
		for (const [_,b] of buttons)
			b.setAttribute('disabled', 'disabled');

		const traverse = async function(x) {
			for (const t of order(x.children.length)) {
				if (t == null) {
					visit(x);
					await (new Promise(r => setTimeout(r, 500)));
					unVisit(x);
					if (f) f(x);
				} else {
					await traverse(x.children[t]);
				}
			}
		};

		await traverse(container.firstElementChild);
		for (const [_,b] of buttons)
			b.removeAttribute('disabled');
	};

	const preOrder  = doTraverse((n) => [null, ...Array(n).keys()]);
	const inOrder   = doTraverse((n) => [null].concat(...Array(n).fill(null).map((v,i)=>[i,v])));
	const postOrder = doTraverse((n) => [...Array(n).keys(), null]);

	const doQuery = () => preOrder((node) => {
		const pattern = queryInput.value.toLowerCase();
		if (node.firstChild.textContent.toLowerCase().indexOf(pattern) >= 0)
			setMark(node);
	});
	const clearMarks = () => document.querySelectorAll('.marked').forEach(clearMark);

	const container = document.getElementById('container');
	container.appendChild(renderTree(root));

	const queryInput = document.getElementById('query-input');
	const buttonActions = [['pre-order',preOrder], ['in-order',inOrder],
		['post-order',postOrder], ['query',doQuery], ['clear-marks',clearMarks]];
	const buttons = new Map(buttonActions.map(([n,_]) => [n,document.getElementById(n)]));
	for (const [n,f] of buttonActions)
		buttons.get(n).addEventListener('click', () => f());
};

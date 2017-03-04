window.onload = () => {
	const root = [[[[],[]],[[],[]]],[[[],[]],[[],[]]]];

	const renderTree = (x) => {
		const node = document.createElement('div');
		node.className = 'node';
		for (const child of x)
			node.appendChild(renderTree(child));
		return node;
	};

	const setMark = (node) => node.classList.add('visiting');
	const clearMark = (node) => node.classList.remove('visiting');

	const doTraverse = (order) => async function() {
		for (const b of buttons)
			b[1].setAttribute('disabled', 'disabled');

		const traverse = async function(x) {
			for (const t of order) {
				if (t == null) {
					setMark(x);
					await (new Promise(r => setTimeout(r, 500)));
					clearMark(x);
				} else if (t < x.children.length) {
					await traverse(x.children[t]);
				}
			}
		};

		await traverse(container.children[0]);
		for (const b of buttons)
			b[1].removeAttribute('disabled');
	};

	const preOrder  = doTraverse([null, 0, 1]);
	const inOrder   = doTraverse([0, null, 1]);
	const postOrder = doTraverse([0, 1, null]);

	const container = document.getElementById('container');
	container.appendChild(renderTree(root));
	const buttons = new Map(['pre-order', 'in-order', 'post-order'].map((b) => [b,document.getElementById(b)]));
	[['pre-order',preOrder], ['in-order',inOrder], ['post-order',postOrder]].forEach(
		([n,f]) => buttons.get(n).addEventListener('click', f));
};

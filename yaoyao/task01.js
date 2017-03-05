window.onload = () => {
	const form = document.getElementById('form');
	const input = document.getElementById('input');
	const inputBlock = input.parentNode;
	const inputInstr = inputBlock.querySelector('.input-instruction');
	const button = document.getElementById('verify');
	const resetVerify = (b) => b.classList.remove('right', 'wrong');
	const setWrong = (b) => (resetVerify(b), b.classList.add('wrong'));
	const setRight = (b) => (resetVerify(b), b.classList.add('right'));

	const myLength = (s) => s.length + s.replace(/[\x00-\xff]/g, '').length;
	const rules = [
		['姓名不能为空', (s) => s.length === 0],
		['长度不能小于4', (s) => myLength(s) < 4],
		['长度不能大于16', (s) => myLength(s) > 16],
	];
	const correctMsg = '名称格式正确';

	const verify = () => {
		const text = input.value;
		for (const [msg,f] of rules) {
			if (f(text)) {
				inputInstr.innerText = msg;
				setWrong(inputBlock);
				return;
			}
		}
		inputInstr.innerText = correctMsg;
		setRight(inputBlock);
	};

	form.addEventListener('submit', (e) => (verify(), e.preventDefault()));
};

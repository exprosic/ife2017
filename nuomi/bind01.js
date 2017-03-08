const Observer = function(obj) {
	this.data = new Proxy(obj, {
		get: (target, property, receiver) => {
			console.log(`你访问了${property}`);
			return target[property];
		},

		set: (target, property, value, receiver) => {
			console.log(`你设置了${property}, 新的值为${value}`);
			target[property] = value;
		}
	});
}

let app1 = new Observer({
	name: 'youngwind',
	age: 25
});

let app2 = new Observer({
	university: 'bupt',
	major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science

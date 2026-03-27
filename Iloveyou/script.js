const msg = "I love you!";
setTimeout(() => {
	document.title = msg;
	let count = 0;
	const container = document.createElement('div');
	document.body.appendChild(container);
	function gentleLoop() {
		if (count < 800) {
			container.innerHTML += msg + ' ';
			count++;
			setTimeout(gentleLoop, 100);
		}
	}
	gentleLoop();
}, 6000);

ball = $('#game-ball')[0]
var ix = 1; iy = 0;
var instrs = [];
var num = 0;
function setBallXY(e) {
	var dx, dy, x, y, tix, tiy, ox, oy;
	dx = dy = 3;
	ox = x = parseInt(ball.style.left);
	oy = y = parseInt(ball.style.top);
	switch (e.key) {
		case "ArrowDown":  tix = 0; tiy = 1; y += dy; break;
		case "ArrowUp":    tix = 0; tiy = -1; y -= dy; break;
		case "ArrowLeft":  tix = -1; tiy = 0; x -= dx; break;
		case "ArrowRight": tix = 1; tiy = 0; x += dx; break;
		case "Enter": window.prompt('', instrs.join(';\n')+';'); break;
	}
	ball.style.left = x+'px';
	ball.style.top = y+'px';
	
	var prod = ix*tiy - iy*tix;
	var dir;
	if (prod > 0) {dir = "Right";}
	else if (prod < 0) {dir = "Left";}
	else if (ix!=tix||iy!=tiy) {dir = "Back";}
	
	if (dir != undefined) {
		num += 1;
		var instr = "ball.at(" + ox + ", " + oy + ", function(ball) {console.log("+num+"); ball.turn" + dir + "();});";
		console.log(instr);
		instrs.push(instr);
		ix = tix;
		iy = tiy;
	}
	return false;
}

window.onkeydown = setBallXY
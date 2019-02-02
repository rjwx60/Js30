var btnEleArray = Array.from(document.querySelectorAll('.key')),
	audioEleArray = Array.from(document.querySelectorAll('audio'));

var mapList = btnEleArray.map(cv1 => {
	let currentDataKey = cv1.getAttribute('data-key');
	// 添加动画结束事件
	cv1.addEventListener('transitionend', function (e) {
		if (e.propertyName !== 'transform') {
			return;
		}
		e.target.classList.remove('playing');
	})
	return audioEleArray.map(cv2 => {
		// 构建数据结构并返回
		if (currentDataKey == cv2.getAttribute('data-key')) {
			var obj = {};
			obj[currentDataKey] = [cv1, cv2];
			return obj;
		}
	}).filter(cv => cv);

})
window.addEventListener("keydown", (event) => {
	let cvkeyCode = event.keyCode;
	mapList.forEach(ac => {
		let target = ac[0][cvkeyCode];
		if (target) {
			// 添加动画
			target[0].classList.add('playing');
			// 添加音效
			target[1].currentTime = 0;
			target[1].play();
		}
	})
})


// 思路二:
// 1. 获取所有节点，并分类存储，为按钮节点添加动画结束事件
// 2. 添加键盘下按事件，获取按键code, 根据code执行动画消退和播放音效
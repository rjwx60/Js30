// 获取所有 key 类节点并转换
var keyList = Array.from(document.querySelectorAll('.key'))
// 为每个 key 添加事件
keyList.forEach(cv => {
	// 动画过渡结束事件
	cv.addEventListener('transitionend', function (e) {
		console.log(e)
		if (e.propertyName !== 'transform') {
			return;
		}
		e.target.classList.remove('playing');
	})
})

window.addEventListener('keydown', function (e) {
	let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	if (!audio) return;

	key.classList.add('playing');
	audio.currentTime = 0;
	audio.play();
})


// 思路一:
// 1. 获取按钮节点并将其转为数组形式以使用 forEach 的高阶函数
// 2. 为节点增加 transitionend 事件，当过渡完毕则移除类 playing
// 3. 为全局添加 keydown 事件，并由此获取点击对象的 keyCode
// 4. 根据 keyCode 获取点击按钮和 audio 对象，通过自定义属性+querySelector组合，并为按钮添加 playing 类，并为 audio 执行 play 方法
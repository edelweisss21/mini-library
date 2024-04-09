class Customizator {
	constructor() {
		this.btnBlock = document.createElement('div');
		this.colorPicker = document.createElement('input');
		this.clear = document.createElement('div');
		this.colorPicker.setAttribute('type', 'color');
		this.colorPicker.setAttribute('value', '#ffffff');
		this.scale = localStorage.getItem('scale') || 1;
		this.color = localStorage.getItem('color') || '#ffffff';

		this.btnBlock.addEventListener('click', e => this.onScaleChange(e));
		this.colorPicker.addEventListener('input', e => this.onColorChange(e));
		this.clear.addEventListener('click', () => this.reset());
	}

	onColorChange(e) {
		const body = document.querySelector('body');
		body.style.backgroundColor = e.target.value;
		localStorage.setItem('color', e.target.value);
	}

	setBgColor() {
		const body = document.querySelector('body');
		body.style.backgroundColor = this.color;
		this.colorPicker.value = this.color;
	}

	onScaleChange(e) {
		let scale;
		const body = document.querySelector('body');
		if (e) {
			this.scale = +e.target.value.replace(/x/g, '');
		}

		const recursy = el => {
			el.childNodes.forEach(node => {
				if (
					node.nodeName === '#text' &&
					node.nodeValue.replace(/\s+/g, '').length > 0
				) {
					if (!node.parentNode.getAttribute('data-fz')) {
						let value = window.getComputedStyle(node.parentNode, null).fontSize;
						node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''));
						node.parentNode.style.fontSize =
							node.parentNode.getAttribute('data-fz') * this.scale + 'px';
						console.log('value', value);
					} else {
						node.parentNode.style.fontSize =
							node.parentNode.getAttribute('data-fz') * this.scale + 'px';
					}
				} else {
					recursy(node);
				}
			});
		};

		recursy(body);

		localStorage.setItem('scale', this.scale);
	}

	reset() {
		localStorage.clear();
		this.scale = 1;
		this.color = '#ffffff';
		this.setBgColor();
		this.onScaleChange();
	}

	render() {
		this.setBgColor();
		this.onScaleChange();
		let scaleInputS = document.createElement('input');
		let scaleInputM = document.createElement('input');
		let panel = document.createElement('div');
		panel.append(this.btnBlock, this.colorPicker, this.clear);
		this.btnBlock.append(scaleInputS, scaleInputM);

		this.clear.innerHTML = '&times';

		scaleInputS.setAttribute('type', 'button');
		scaleInputS.setAttribute('value', '1x');
		scaleInputM.setAttribute('type', 'button');
		scaleInputM.setAttribute('value', '1.5x');

		scaleInputS.classList.add('scale_btn');
		scaleInputM.classList.add('scale_btn');
		this.btnBlock.classList.add('scale');
		this.colorPicker.classList.add('color');
		this.clear.classList.add('clear');
		panel.classList.add('panel');

		document.querySelector('body').append(panel);
	}
}

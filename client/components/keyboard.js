AFRAME.registerComponent('key-listen', {
  init: function () {
    this.text = '';
    this.buttons = document.querySelector('a-scene').systems['buttons'];
    this.el.setAttribute('text', 'value: ' + this.text);
    document.addEventListener("a-keyboard-update", this.keypress.bind(this));
  },
  keypress: function (event) {
    const code = parseInt(event.detail.code);
    const keyboard = document.querySelector('#keyboard');
    const click = document.querySelector('#click').components.sound;
    click.stopSound();
    click.playSound();
    switch (code) {
      case 8:
        this.text = this.text.slice(0, -1);
        this.el.setAttribute('text', 'value: ' + this.text);
        break;
      case 6:
        if (keyboard) {
          let pos = new THREE.Vector3();
          keyboard.object3D.getWorldPosition(pos);
          const text = this.text;
          import('../firebase/firebase.js').then((module) => {
            const data = {
              id: createUUID(),
              position: pos,
              text: text,
              template: "#universe"
            }
            module.writeEntity(data);
          });
          this.buttons.mode='adding';
          this.text = '';

          keyboard.remove();
        }
        break;
      case 24:
        this.text = '';
        if (keyboard) {
          this.buttons.mode='adding';
          keyboard.remove();
        }
        break;
      default:
        this.text += event.detail.value;
        this.el.setAttribute('text', 'value: ' + this.text);
    }
  },
  tick: function () {

  }
});


function createUUID() {
  return 'id'+ ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}



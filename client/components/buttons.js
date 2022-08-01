AFRAME.registerComponent('buttons', {
  init: function () {
    this.mode = null;
    this.el.addEventListener("bbuttondown", this.bbuttondown.bind(this));
    this.el.addEventListener("bbuttonup", this.bbuttonup.bind(this));
    this.el.addEventListener("abuttondown", (evt) => {
      generateWorlds(100);
    });
    this.el.addEventListener('triggerdown', this.triggerdown.bind(this));

  },
  bbuttondown: function (evt) {
    this.mode = null;
    this.template = '#universe';
    showHud();
  },
  triggerdown: function (evt) {
    const ele = document.querySelector('.intersected');
    const parent = ele?ele.parentNode:null;
      switch (this.mode) {
        case 'removing':
          if (ele) {

            if (ele.classList.contains('saveable')) {
              import('../firebase/firebase.js').then((module) => {
                console.log(parent.id);
                module.removeUniverse(parent.id);
              });
            }
          }
          break;
        case 'adding':
          if (!parent) {
            this.mode = 'typing';
            createKeyboard();
          }


  }},
  bbuttonup: function (event) {
    const ele = document.querySelector('.intersected');
    if (ele) {
      switch (ele.getAttribute('id')) {
        case 'add-universe':
          if (document.querySelector('#keyboard') != null) {
            return;
          }

          this.mode = 'adding';
          break;
        case 'remove-universe':
          this.mode = 'removing';
          break;
        default:
          if (this.mode == 'removing') {
            const parent = ele.parentNode;
            if (ele.classList.contains('saveable')) {
              this.mode = null;
              import('../firebase/firebase.js').then((module) => {
                console.log(parent.id);
                module.removeUniverse(parent.id);
              });

            }
          }
          console.log('type not found');
      }

    }
    const hud = document.querySelector('#hud');
    hud.parentElement.removeChild(hud);
  },
  tick: function () {

  }
});

function showHud() {
  const scene = document.querySelector("a-scene");
  const ele = document.createElement('a-entity');
  ele.setAttribute('id', 'hud');
  ele.setAttribute('lookatme', '');
  ele.setAttribute('position', getHUDPosition(-3));
  ele.setAttribute("template", "src: #hud-template");
  scene.appendChild(ele);
}

AFRAME.registerComponent('collider', {
  schema: {
    type: {type: 'string'},
    color: {default: '#ff0'}
  },
  init: function () {
    this.basecolor = this.el.getAttribute("material").color;
    this.el.addEventListener('raycaster-intersected', this.intersected.bind(this));
    this.el.addEventListener('raycaster-intersected-cleared', this.cleared.bind(this));

  },
  cleared: function(event) {
      this.el.setAttribute("material","color", this.basecolor);
      this.el.setAttribute('material', 'wireframe', false);
      this.el.classList.remove('intersected');
  },
  intersected: function(event) {
    const intersected = document.querySelectorAll('.intersected');
    for (const obj of intersected) {
      if (obj && obj.classList) {
        if (obj.getAttribute('id') != this.el.getAttribute('id')) {
          obj.classList.remove('intersected');
        }
      }
    }
    if (this.el.classList.contains('saveable')) {
      this.el.setAttribute('material', 'wireframe', true);

    }
    this.el.setAttribute("material", "color", this.data.color);
    if (!this.el.classList.contains('intersected')) {
      this.el.classList.add('intersected');
    }
  }
});


function getHUDPosition(distance) {
  let pos = new THREE.Vector3();
  const c = document.querySelector('#camera').object3D;
  c.getWorldPosition(pos);
  let dir = new THREE.Vector3();
  c.getWorldDirection(dir);
  dir.multiplyScalar(distance ? distance : -1);
  pos.add(dir);
  return pos;
}

function drawLine(start, end) {
  const ele = document.createElement('a-entity');
  const sphere = document.createElement('a-sphere');
  sphere.setAttribute("position", vectorString(start));
  ele.setAttribute("line", "start: " + vectorString(start) + ";end: " + vectorString(end));
  document.querySelector('a-scene').appendChild(ele);
}


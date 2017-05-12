window.addEventListener('letsee.load', function() {
  // Create an entity
  var entity = new Entity('https://d.letsee.io/EMdTOnQqEjfW');
  var cubeSize = 1200;
  var margin = cubeSize / 2;

  // Load entity data
  entity.load().then(function(e) {
    var cube = new Renderable();
    var faces = document.getElementsByClassName('cube-face');

    // Iterate each face of the cube
    for (var i = 0; i < faces.length; i++) {
      var cubeFace = new DOMRenderable(faces[i]);

      switch (index) {
        case 0: // video
          cubeFace.rotateY(Math.PI / 2);
          cubeFace.position.x = margin;
          break;
        case 1: // map
          cubeFace.rotateY(-Math.PI / 2);
          cubeFace.position.x = -margin;
          break;
        case 2: // slider
          cubeFace.rotateX(-Math.PI / 2);
          cubeFace.position.y = margin;
          break;
        case 3: // svg
          cubeFace.position.z = margin;
          break;
        case 4: // chart
          cubeFace.rotateX(-Math.PI);
          cubeFace.position.z = -margin;
          break;
        case 5: // todo
          cubeFace.rotateX(Math.PI / 2);
          cubeFace.position.y = -margin;
          break;
        default:
          break;
      }

      cube.add(cubeFace);
    }

    // Add cube to the entity
    entity.addRenderable(cube);

    // Cube rotation controls
    document.querySelector('.control-btn.left').addEventListener('click', function() {
      // rotate 90 degrees counter-clockwise around z axis
      cube.rotateZ(Math.PI / 2);
    });

    document.querySelector('.control-btn.right').addEventListener('click', function() {
      // rotate 90 degrees clockwise around z axis
      cubbe.rotateZ(-Math.PI / 2);
    });

    document.querySelector('.control-btn.reset').addEventListener('click', function() {
      // reset the cube's rotation
      cube.quaternion = new Quaternion();
    });

    // pinch zoom and trackball control
    var newDist = 0;
    var scale = 1;
    var scaleIncrement = 0.04;
    var trackball = new ObjectTrackball(renderable, {speed: 2});
    trackball.load();

    // increment or decrement cube scale
    function cubeScale(value) {
      if (scale <= 0.3 && value < 0) {
        return;
      }

      scale += value;
      renderable.scale.setScalar(scale);
    }

    document.addEventListener('touchmove', function() {
      if (trackball.isPinch()) {
        var oldDist = trackball.getPinchDist();

        // on pinch zoom in, increment cube scale
        if (newDist < oldDist) {
          cubeScale(scaleIncrement);
        } else { // on pinch zoom out, decrement cube scale
          cubeScale(-scaleIncrement);
        }

        newDist = trackball.getPinchDist();
      }
    });
  }).catch(function(error) {
    // in case of loading error, do something
    console.log(error);
  });
});

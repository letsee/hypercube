window.addEventListener('letsee.load', function() {
  var video = document.querySelector('#video > video');

  // When the tracking starts for the entity, play the video
  letsee.addEventListener('trackstart', 'https://d.letsee.io/EMdTOnQqEjfW', function(e) {
    video.play();
  });

  // When the tracking ends for the entity, pause the video
  letsee.addEventListener('trackend', 'https://d.letsee.io/EMdTOnQqEjfW', function(e) {
    if (!video.paused) {
      video.pause();
    }
  });
});

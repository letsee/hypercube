window.addEventListener('letsee.load', function() {
  // Slide index that represents the slide that is currently shown
  var slide = 0;
  showSlide();

  // When the left button is clicked, decrement the slide index
  document.querySelector('.slider-left').addEventListener('click', function(e) {
    slide -= 1;
    showSlide();
  });

  // When the right button is clicked, increment the slide index;
  document.querySelector('.slider-right').addEventListener('click', function(e) {
    slide += 1;
    showSlide();
  });

  function showSlide() {
    var images = document.getElementsByClassName('slider-image');

    // Cap the slide index to the number of slide images
    if (slide >= images.length) {
      slide = 0;
    }

    if (slide < 0) {
      slide = images.length - 1;
    }

    // Iterate through slides and set display
    for (var i = 0; i < images.length; i += 1) {
      if (i === slide) {
        images[i].style.display = 'block';
      } else {
        images[i].style.display = 'none';
      }
    }
  }
});

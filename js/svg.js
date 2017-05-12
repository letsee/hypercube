window.addEventListener('letsee.load', function() {
  var logo = document.getElementById('html-logo');
  var picker = document.getElementById('picker-svg');
  var colorItems = document.getElementsByClassName('color-picker-item');

  // when a color is clicked, set the color of the svg and logo to the selected color
  for (var i = 0; i < colorItems.length; i+= 1) {
    colorItems[i].addEventListener('click', function(e) {
      var hex = e.target.dataset.hex;
      picker.children[1].children[2].style.fill = hex;
      logo.children[0].style.fill = hex;
      logo.children[1].style.fill = hex;
    });
  }

  var palette = document.getElementById('picker-container');

  // When the picker is clicked, show the color palette
  picker.addEventListener('click', function() {
    palette.style.display ='block';
  });

  // Close the color picker when close button is clicked
  document.querySelector('.control-color-picker-close').addEventListener('click', function() {
    palette.style.display ='none';
  });

  // When tracking ends for the entity, close the color picker
  letsee.addEventListener('trackend', 'https://d.letsee.io/EMdTOnQqEjfW', function(e) {
    palette.style.display ='none';
  });
});

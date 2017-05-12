window.addEventListener('letsee.load', function() {
  // select chart element by id;
  var element = document.getElementById("chart-canvas");

  // initialize the chart
  var chart = new Chart(element, {
    type: 'bar',
    data: {
      labels: ["Options 1", "Options 2", "Options 3", "Options 4"],
      datasets: [{
        data: [90, 42, 62, 35],
        backgroundColor: [
          '#06cde5',
          '#f95f2a',
          '#2bca3c',
          '#4e34dc'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
      legend : {
        labels : {
          fontColor : '#000000'
        },
        display : false
      }
    }
  });
});

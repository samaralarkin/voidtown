// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  function fetchStatus() {
    $.get('/status', function(player) {
      //dreams.forEach(function(dream) {
      $('#status').text("X: " + player.x + " Y: " + player.y);
      if (player.visibleWords){
        $('#graffiti').show();
        $('#words').text(player.visibleWords);
      } else {
        $('#graffiti').hide();
      }
      //});
    });
  }
  
  function sendData(data) {
    $.ajax({
      url: '/', 
      type: 'POST', 
      contentType: 'application/json', 
      data: JSON.stringify(data)
    }).done(fetchStatus);
  }
  
  $("#west").click(function() {
    //$.post('/', {action: "move", direction: "west"}, fetchStatus())
    var data = {};
    data.action = "move";
    data.direction = "west";
    sendData(data)
  });

  $("#east").click(function() {
    //$.post('/', {action: "move", direction: "west"}, fetchStatus())
    var data = {};
    data.action = "move";
    data.direction = "east";
    sendData(data)
  });
  
  
  $("#north").click(function() {
    //$.post('/', {action: "move", direction: "west"}, fetchStatus())
    var data = {};
    data.action = "move";
    data.direction = "north";
    sendData(data)
  });
    
  $("#south").click(function() {
    //$.post('/', {action: "move", direction: "west"}, fetchStatus())
    var data = {};
    data.action = "move";
    data.direction = "south";
    sendData(data)
  });

  
  $('form').submit(function(event) {
    event.preventDefault();
    var data = {};
    data.action = "say"
    data.content = $('input').val();
    sendData(data)
    $('input').val("");
  });
  

  fetchStatus();
});

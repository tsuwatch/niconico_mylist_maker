function loadVideos() {
  for (var i=0; i<localStorage.length; i++) {
    $('ul').append('<li>' + localStorage[i] + '</li>');
  }
}
$(document).ready(function() {
  loadVideos();
});

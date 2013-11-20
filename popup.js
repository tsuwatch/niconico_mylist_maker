function loadVideos() {
  for (var i=0; i<localStorage.length; i++) {
    $('ul').append('<li>' + localStorage[i] + '</li>');
  }
}

var makeMylist = function() {
  var token = '';
  var group_id = '';
  var movie_list = new Array();
  for (var i=0; i<localStorage.length; i++) {
    movie_list.unshift(localStorage[i]);
  }
  $.ajax({
    type: 'GET',
    url: 'http://www.nicovideo.jp/my/mylist'
  })
  .done(function(data, status, xhr) {
    data.match(/NicoAPI\.token = "([\w\d-]+)"/);
    token = RegExp.$1;
    $.ajax({
      type: 'POST',
      url: 'http://www.nicovideo.jp/api/mylistgroup/add',
      data: { 'name': 'マイリストメーカー', 'token': token },
      dataType: 'json'
    })
    .done(function(data, status, xhr) {
      group_id = data.id;
      var add = function() {
        var sm = movie_list.shift();
        $.ajax({
          type: 'POST',
          url: 'http://www.nicovideo.jp/api/mylist/add',
          data: { 'group_id': group_id, 'item_id': sm, 'item_type': 0, 'description': '', 'token': token },
          dataType: 'json'
        })
        .done(function(data, status, xhr) {
          if (movie_list.length) {
            add();
          }
        });
      }
      add();
    });
  });
};

$(document).ready(function() {
  loadVideos();
  $('#add').click(function() {
    makeMylist();
  });
});

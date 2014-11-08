// This is the main javascript code

// Global variable
singerNum = 0;
singers = [];

// Hide other block in the beginning
$('#singNum').hide();
$('#singerName').hide();
$('#klasemen').hide();
$('#babak1').hide();
$('#babak2').hide();
$('#babak3').hide();
$('#win').hide();

// Add event for all button
$('#btnCreate').click(function() {
  // hide the crete competition block
  $('#compName').hide();
  // show the next block
  $('#singNum').show();

});

$('#btnSingerNum').click(function() {
  $('#singNum').hide();
  $('#singerName').show();

  singerNum = parseInt($('#txtSingerNum').val());
  content = '';
  for(i=0; i<singerNum; i++) {
    content += '<input id="singer'+ i +'" type="text" placeholder="Cita Citata"></input>';
    content += '<br/>';
  }
  $('#inputName').html(content);
});

$('#btnSingerName').click(function() {
  $('#singerName').hide();
  $('#klasemen').show();
  $('#babak1').show();

  content = '';
  for(i=0; i<singerNum; i++) {
    singers[i] = $('#singer'+i).val();
    content += '<tr>'
    content += '<td>'+ singers[i] +'</td>'
    content += '<td>0</td>'
    content += '<td>0</td>'
    content += '<td>0</td>'
    content += '</tr>'
  }

  $('table tbody').html(content);

  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i];
    content += '<input type="text"></input>'
    content += '<br/>'
  }
  $('#babak1score').html(content);
});

$('#btnBabak1').click(function() {
  $('#babak1').hide();
  $('#babak2').show();

  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i];
    content += '<input type="text"></input>'
    content += '<br/>'
  }
  $('#babak2score').html(content);
});

$('#btnBabak2').click(function() {
  $('#babak2').hide();
  $('#babak3').show();

  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i];
    content += '<input type="text"></input>'
    content += '<br/>'
  }
  $('#babak3score').html(content);
});

$('#btnBabak3').click(function() {
  $('#babak3').hide();
  $('#win').show();
});

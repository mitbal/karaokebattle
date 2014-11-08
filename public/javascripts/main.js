// This is the main javascript code

// Global variable
singerNum = 0;
singers = [];
compName = '';

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

  compName = $('#txtCompName').val();
  if(compName === '') {
    compName = $('#txtCompName').attr('placeholder');
  }
  $('#klasemen h3').html('Kompetisi '+compName+' klasemen');
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
    content += '<td id="babak1score'+ i +'">0</td>'
    content += '<td id="babak2score'+ i +'">0</td>'
    content += '<td id="babak3score'+ i +'">0</td>'
    content += '<td id="totalscore'+ i +'">0</td>'
    content += '</tr>'
  }

  $('table tbody').html(content);

  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i];
    content += '<input id="'+ singers[i]+'babak1' +'" type="text"></input>'
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
    content += '<input id="'+ singers[i]+'babak2' +'" type="text"></input>'
    content += '<br/>'
  }
  $('#babak2score').html(content);

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i]+'babak1').val();
    $('#babak1score'+i).html(score);
    totalScore = parseInt($('#totalscore'+i).html()) + parseInt(score);
    $('#totalscore'+i).html(totalScore);
  }
});

$('#btnBabak2').click(function() {
  $('#babak2').hide();
  $('#babak3').show();

  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i];
    content += '<input id="'+ singers[i]+'babak3' +'" type="text"></input>'
    content += '<br/>'
  }
  $('#babak3score').html(content);

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i]+'babak2').val();
    $('#babak2score'+i).html(score);
    totalScore = parseInt($('#totalscore'+i).html()) + parseInt(score);
    $('#totalscore'+i).html(totalScore);
  }
});

$('#btnBabak3').click(function() {
  $('#babak3').hide();
  $('#win').show();

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i]+'babak3').val();
    $('#babak3score'+i).html(score);
    totalScore = parseInt($('#totalscore'+i).html()) + parseInt(score);
    $('#totalscore'+i).html(totalScore);
  }
});

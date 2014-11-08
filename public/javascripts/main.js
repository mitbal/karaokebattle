// This is the main javascript code

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
});

$('#btnSingerName').click(function() {
  $('#singerName').hide();
  $('#klasemen').show();
  $('#babak1').show();
});

$('#btnBabak1').click(function() {
  $('#babak1').hide();
  $('#babak2').show();
});

$('#btnBabak2').click(function() {
  $('#babak2').hide();
  $('#babak3').show();
});

$('#btnBabak3').click(function() {
  $('#babak3').hide();
  $('#win').show();
});

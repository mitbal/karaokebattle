// This is the main javascript code

function randomized_order(n) {
  ordered_list = [];
  for(i=0; i<n; i++) {
    ordered_list[i] = i;
  }
  random_list = [];
  for(i=0; i<n; i++) {
    index = Math.floor(Math.random()*ordered_list.length);
    random_list[i] = ordered_list[index];
    ordered_list.splice(index, 1);
  }
  return random_list;
}

// Global variable
singerNum = 0;
compName = '';
singers = {};
pair = [];

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
  if($('#txtSingerNum').val() === '') {
    singerNum = parseInt($('#txtSingerNum').attr('placeholder'));
  } else {
    singerNum = parseInt($('#txtSingerNum').val());
  }

  if(singerNum <= 0) {
    alert("Please insert more than 0 singer");
  } else {
    $('#singNum').hide();
    $('#singerName').show();

    content = '';
    for(i=0; i<singerNum; i++) {
      content += '<input id="singer'+ i +'" type="text" placeholder="Cita Citata ke ' +i+ '"></input>';
      content += '<br/>';
    }
    $('#inputName').html(content);
  }

});

$('#btnSingerName').click(function() {
  $('#singerName').hide();
  $('#klasemen').show();
  $('#babak1').show();

  content = '';
  for(i=0; i<singerNum; i++) {
    singerName = $('#singer'+i).val();
    if(singerName === '') {
      singerName = $('#singer'+i).attr('placeholder');
    }
    singer = {"id": "singer"+i, "name": singerName, "babak1": 0, "babak2": 0, "babak3": 0}
    singers[i] = singer;

    content += '<tr id=tabsinger'+i+'>';
    content += '<td>'+ singerName +'</td>';
    content += '<td class="babak1score">0</td>';
    content += '<td class="babak2score">0</td>';
    content += '<td class="babak3score">0</td>';
    content += '<td class="totalscore">0</td>';
    content += '</tr>';
  }
  $('table tbody').html(content);

  // Prepare the next stage form.
  // Randomized the order of the singer
  random_list = randomized_order(singerNum);
  content = '';
  for(i=0; i<singerNum; i++) {
    index = random_list[i];
    content += singers[index].name;
    content += '<input id="'+ singers[index].id +'babak1" type="text"></input>';
    content += '<br/>';
  }
  $('#babak1score').html(content);
});

$('#btnBabak1').click(function() {
  $('#babak1').hide();
  $('#babak2').show();

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i].id+'babak1').val();
    $('#tab'+singers[i].id+' .babak1score').html(score);
    totalScore = parseInt($('#tab'+singers[i].id+' .totalscore').html()) + parseInt(score);
    $('#tab'+singers[i].id+' .totalscore').html(totalScore);
  }

  // Prepare next stage form
  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i].name;
content += '<input id="'+ singers[i].id +'babak2" type="text"></input>';
    content += '<br/>';
  }
  $('#babak2score').html(content);
});

$('#btnBabak2').click(function() {
  $('#babak2').hide();
  $('#babak3').show();

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i].id+'babak2').val();
    $('#tab'+singers[i].id+' .babak2score').html(score);
    totalScore = parseInt($('#tab'+singers[i].id+' .totalscore').html()) + parseInt(score);
    $('#tab'+singers[i].id+' .totalscore').html(totalScore);
  }

  content = '';
  for(i=0; i<singerNum; i++) {
    content += singers[i].name;
    content += '<input id="'+ singers[i].id+'babak3" type="text"></input>'
    content += '<br/>'
  }
  $('#babak3score').html(content);
});

$('#btnBabak3').click(function() {
  $('#babak3').hide();
  $('#win').show();

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i].id+'babak3').val();
    $('#tab'+singers[i].id+' .babak3score').html(score);
    totalScore = parseInt($('#tab'+singers[i].id+' .totalscore').html()) + parseInt(score);
    $('#tab'+singers[i].id+' .totalscore').html(totalScore);
  }
});

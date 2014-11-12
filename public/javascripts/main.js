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
comp = {};
comp.name = '';
comp.singers = [];
comp.winner = '';

singerNum = 0;
singers = [];
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
  comp.name = compName;
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
      content += '<div style="margin-bottom: 5px">'
      content += '<input id="singer'+ i +'" type="text" placeholder="Cita Citata ke ' +i+ '"></input>';
      content += '<br/>';
      content += '</div>'
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
  comp.singers = singers;

  // Prepare the next stage form.
  // Randomized the order of the singer
  random_list = randomized_order(singerNum);
  content = '<form class="form-horizontal">';
  for(i=0; i<singerNum; i++) {
    index = random_list[i];
    content += '<div class="form-group" style="margin-bottom: 10px">'
    content += '<label class="col-sm-2">'+singers[index].name+'</label>';
    content += '<div class="col-sm-8">'
    content += '<input id="'+ singers[index].id +'babak1" type="text" placeholder="0"></input>';
    content += '</div>'
    content += '</div>'
  }
  content += '</form>'
  $('#babak1score').html(content);
});

$('#btnBabak1').click(function() {
  $('#babak1').hide();
  $('#babak2').show();

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i].id+'babak1').val();
    if(score === '') {
      score = $('#'+singers[i].id+'babak1').attr('placeholder');
    }
    index = comp.singers.map(function(item) { return item.id; }).indexOf(singers[i].id);
    comp.singers[index].babak1 = parseInt(score);

    $('#tab'+singers[i].id+' .babak1score').html(score);
    totalScore = comp.singers[index].babak1;
    $('#tab'+singers[i].id+' .totalscore').html(totalScore);
  }

  // Prepare next stage form
  // Create duet order
  random_list = randomized_order(singerNum);
  numPair = Math.floor(singerNum/2);
  for(i=0; i<numPair; i++) {
    index1 = random_list[2*i]; index2 = random_list[2*i+1];
    pair[i] = [index1, index2];
  }
  if(singerNum % 2 !== 0) {
    index = random_list[singerNum-1];
    pair[numPair] = [index, index];
  }
  comp.pair = pair;
  content = '<form class="form-horizontal">';
  for(i=0; i<pair.length; i++) {
    content += '<div class="form-group">'
    content += '<label class="col-sm-4">'+singers[pair[i][0]].name +' & '+singers[pair[i][1]].name +'</label>';
    content += '<div class="col-sm-14">'
    content += '<input id="pair'+ i +'babak2" type="text" placeholder="0"></input>';
    content += '</div>'
    content += '</div>'
  }
  content += '</form>'
  $('#babak2score').html(content);
});

$('#btnBabak2').click(function() {
  $('#babak2').hide();
  $('#babak3').show();

  // Update score
  for(i=0; i<pair.length; i++) {
    score = $('#pair'+ i +'babak2').val();
    if(score === '') {
      score = $('#pair'+ i +'babak2').attr('placeholder');
    }

    $('#tab'+singers[pair[i][0]].id+' .babak2score').html(score);
    $('#tab'+singers[pair[i][1]].id+' .babak2score').html(score);

    index = comp.singers.map(function(item) { return item.id; }).indexOf(singers[pair[i][0]].id);
    comp.singers[index].babak2 = parseInt(score);

    totalScore = comp.singers[index].babak1 + comp.singers[index].babak2;
    $('#tab'+singers[pair[i][0]].id+' .totalscore').html(totalScore);

    index = comp.singers.map(function(item) { return item.id; }).indexOf(singers[pair[i][1]].id);
    comp.singers[index].babak2 = parseInt(score);
    totalScore = comp.singers[index].babak1 + comp.singers[index].babak2;
    $('#tab'+singers[pair[i][1]].id+' .totalscore').html(totalScore);
  }

  // Prepare next stage form
  // It is sorted based on the current total score, in descending way
  scores = [];
  for(i=0; i<singerNum; i++) {
    score = parseInt($('#tab'+singers[i].id+' .totalscore').html());
    scores[i] = [i, score];
  }
  // Sorting
  for(i=0; i<singerNum-1; i++) {
    for(j=i+1; j<singerNum; j++) {
      if(scores[j][1] > scores[i][1]) {
        temp = scores[i];
        scores[i] = scores[j];
        scores[j] = temp;
      }
    }
  }
  content = '<form class="form-horizontal">';
  for(i=0; i<singerNum; i++) {
    content += '<div class="form-group">'
    content += '<label class="col-sm-2">'+ singers[scores[i][0]].name +'</label>';
    content += '<div class="col-sm-8">'
    content += '<input id="'+ singers[scores[i][0]].id+'babak3" type="text" placeholder="0"></input>'
    content += '</div>'
    content += '</div>'
  }
  content += '</form>'
  $('#babak3score').html(content);
});

$('#btnBabak3').click(function() {
  $('#babak3').hide();
  $('#win').show();

  // Update score
  for(i=0; i<singerNum; i++) {
    score = $('#'+singers[i].id+'babak3').val();
    if(score === '') {
      score = $('#'+singers[i].id+'babak3').attr('placeholder');
    }
    index = comp.singers.map(function(item) { return item.id; }).indexOf(singers[i].id);
    comp.singers[index].babak3 = parseInt(score);

    $('#tab'+singers[i].id+' .babak3score').html(score);
    totalScore = comp.singers[index].babak1 + comp.singers[index].babak2 + comp.singers[index].babak3;
    $('#tab'+singers[i].id+' .totalscore').html(totalScore);
  }

  // Celebrate the winner
  winner = ''; winner_score = -1;
  for(i=0; i<singerNum; i++) {
    score = parseInt($('#tab'+singers[i].id+' .totalscore').html());
    if(score > winner_score) {
      winner_score = score;
      winner = singers[i].name;
    }
  }
  comp.winner = winner;
  $('#win h3').html('Selamat kepada '+winner+' yang telah memenangkan kompetisi '+compName+' kali ini');
});

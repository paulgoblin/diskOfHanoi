'use strict'

  let numberOfDisks

let init = function() {

  //listen for clicks
  $('.pane').on('click','.disk',selectDisk)
  $('.pane').click(moveSelected)
  $('#start').click(startGame);

}

let startGame = function(event) {
  //get no. of disks and correct it
  numberOfDisks = $('#diskNumInput').val();
  if (numberOfDisks < 3){
    $('diskNumInput').val(3)
    numberOfDisks = 3;
  } else if (numberOfDisks >15){
    $('diskNumInput').val(15)
    numberOfDisks = 15;
  }
  //make disks and post them to board
  let diskArr = makeDisks(numberOfDisks);
  $('.rod').remove();
  postDisks(diskArr,1);
  postDisks([],2);
  postDisks([],3);

}

let moveSelected = function(event) {
  let $rod = $(this).children('.rod');
  let $hotDisk = $('.disk.selected');
  if ($hotDisk) {
    if ($rod.children().length == 0){
      $hotDisk.prependTo($rod);
      $hotDisk.removeClass('selected')
      checkWinning($(this))
    } else if ($hotDisk.data('size') <= $rod.children().first().data('size')){
      $hotDisk.prependTo($rod);
      $hotDisk.removeClass('selected')
      checkWinning($(this))
    } else {
      pulseElement($hotDisk);
    }
  }
}

let pulseElement = function($el) {
  $($el).fadeIn(20).fadeOut(20).fadeIn(20).fadeOut(20).fadeIn(20);
}

let checkWinning = function ($pane) {
  console.log('NOD ', numberOfDisks)
  if ($pane.find('.disk').length == numberOfDisks && $pane.attr('id') != 'pane1'){
    pulseElement($('#main'))
    setTimeout(function(){alert('You Win!')},100); 
  }
}

let selectDisk = function(event) {

  event.stopPropagation();
  let $topDisk = $(this).parent().children().first();
  if ($topDisk.hasClass('selected')){
    $topDisk.removeClass('selected')
  } else {
    $('.selected').removeClass('selected')
    $topDisk.addClass('selected');
  }
}

let postDisks = function(diskArr,n) {
  let $rod = $('<div>').addClass('rod');
  let paneId = 'pane'+n;
  diskArr.forEach(function (disk){
    $rod.append(disk);
  })
  $rod.appendTo($('.pane#'+paneId))
  return
}

//returns array disk divs
let makeDisks = function (n) {
  let size = 6;
  let colorArr = ['red','orange','yellow','green','blue',
  'indigo', 'black'];
  let diskArr = [];
  for (let i = 0; i < n; i++){
    let $diski = $('<div>').addClass('disk');
    $diski.data('size',i);
    $diski.css({'background-color':colorArr[i%7],'width':size+'vw'})
    diskArr.push($diski[0])
    size += 4;
  }

  return diskArr;

};


$(document).ready(init);

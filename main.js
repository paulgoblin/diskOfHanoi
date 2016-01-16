'use strict'

let numberOfDisks
let maxDisks = 9;
let minDisks = 3;

let init = function() {

  //listen for clicks
  $('.pane').on('click','.disk',selectDisk)
  $('.pane').click(moveSelected)
  $('#start').click(startGame);

}

let startGame = function(event) {
  //get no. of disks and correct it
  numberOfDisks = $('#diskNumInput').val();
  if (numberOfDisks < minDisks)  numberOfDisks = minDisks;
  if (numberOfDisks > maxDisks) numberOfDisks = maxDisks;
  $('#diskNumInput').val(numberOfDisks)

  //make disks and post them to board
  let diskArr = makeDisks(numberOfDisks);
  $('.tower').remove();
  postDisks(diskArr,1);
  postDisks([],2);
  postDisks([],3);

}

let moveSelected = function(event) {
  let $tower = $(event.target).children('.tower');
  let $hotDisk = $('.disk.selected');
  if (!$hotDisk) return;
  if ($tower.children().length == 0 ||
      $hotDisk.data('size') <= $tower.children().first().data('size')){
    $hotDisk.prependTo($tower);
    $hotDisk.removeClass('selected')
    checkWinning($(event.target))
    return
  }
  pulseElement($hotDisk);
}

let pulseElement = function($el) {
  $($el).fadeIn(20).fadeOut(20).fadeIn(20).fadeOut(20).fadeIn(20);
}

let checkWinning = function ($pane) {
  if ($pane.find('.disk').length == numberOfDisks && $pane.attr('id') != 'pane1'){
    pulseElement($('#main'));
    alert("You Win!");
  }
}

let selectDisk = function(event) {
  event.stopPropagation();
  let $topDisk = $(event.target).parent().children().first();
  if ($topDisk.hasClass('selected')){
    $topDisk.removeClass('selected')
  } else {
    $('.selected').removeClass('selected')
    $topDisk.addClass('selected');
  }
}

let postDisks = function(diskArr,n) {
  let $tower = $('<div>').addClass('tower');
  let paneId = 'pane'+n;
  diskArr.forEach(function (disk){
    $tower.append(disk);
  })
  $tower.appendTo($('.pane#'+paneId))
  return
}

//returns array disk divs
let makeDisks = function (n) {
  let size = 20;
  let colorArr = ['red','orange','yellow','green','blue',
  'indigo', 'black'];
  let diskArr = [];
  for (let i = 0; i < n; i++){
    let $diski = $('<div>').addClass('disk');
    $diski.data('size',i);
    $diski.css({'background-color':colorArr[i%7],'width':size+'%'})
    diskArr.push($diski)
    size += 10;
  }

  return diskArr;

};

$(document).ready(init);

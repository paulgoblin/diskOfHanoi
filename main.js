'use strict'

  let numberOfDisks
  let diskSize = 20;

let init = function() {




  //listen for clicks
  $('.pane').on('click','.disk',selectDisk)
  $('.pane').click(moveSelected)
  $('#start').click(startGame);





}

let startGame = function(event) {
  numberOfDisks = $('#diskNumInput').val();
  let diskArr = makeDisks(numberOfDisks, diskSize);
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
  $($el).fadeIn(10).fadeOut(10).fadeIn(10).fadeOut(10).fadeIn(10);
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

//makes n disks of initial size. returns array disk divs
let makeDisks = function (n,size) {

  let colorArr = ['red','orange','yellow','green','blue',
  'indigo', 'black'];
  let diskArr = [];
  for (let i = 0; i < n; i++){
    let $diski = $('<div>').addClass('disk');
    $diski.data('size',i);
    $diski.css({'background-color':colorArr[i%7],'width':size+'px'})
    diskArr.push($diski[0])
    size += 10;
  }

  return diskArr;

};


$(document).ready(init);
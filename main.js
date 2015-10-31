'use strict'

  let numberOfDisks = 1;
  let diskSize = 20;

  let $diskProt = $('<div>')
  $diskProt.addClass('disk')

  let $rodProt = $('<div>')
  $rodProt.addClass('rod')

let init = function() {



  //listen for clicks
  $('.pane').on('click','.disk',selectDisk)
  $('.pane').click(moveSelected)
  &('#start').click(start)





}

let start = function(event) {
  
  let diskArr = makeDisks(numberOfDisks, diskSize);
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
  if ($pane.find('.disk').length === numberOfDisks && $pane.attr('id') != 'pane1'){
    pulseElement($('#main'))
    alert('YOU WIN!').unicornblast(); 
  }
}

let selectDisk = function(event) {

  $('.selected').removeClass('selected')
  event.stopPropagation();
  let $topDisk = $(this).parent().children().first();
  console.log('this', $topDisk);
  if ($topDisk.hasClass('selected')){
    $topDisk.removeClass('selected')
  } else {
    $topDisk.addClass('selected');
  }
}

let postDisks = function(diskArr,n) {
  let $rod = $rodProt.clone();
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
    let $diski = $diskProt.clone();
    $diski.data('size',i);
    $diski.css({'background-color':colorArr[i%7],'width':size+'px'})
    diskArr.push($diski[0])
    size += 10;
  }

  return diskArr;

};


$(document).ready(init);
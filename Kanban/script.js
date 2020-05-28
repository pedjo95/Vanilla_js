const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

// Cards
cards.forEach( card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('drag', drag);
  card.addEventListener('dragend', dragEnd);
})

function dragStart() {
  
}

function drag() {
  
}

function dragEnd() {
  
}

// Drops
dropzones.forEach( dropzone => {
  dropzone.addEventListener('dragenter', dragEnter);
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('dragleave', dragLeave);
  dropzone.addEventListener('drop', drop);
})

function dragEnter() {
  console.log('Enter in dropzone');
}

function dragOver() {
  console.log('In the dropzone');
}

function dragLeave() {
  console.log('Left the dropzone');
}

function drop() {
  console.log('Dropped');
}
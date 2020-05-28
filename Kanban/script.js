const cards = document.querySelectorAll('.card');

cards.forEach( card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('drag', drag);
  card.addEventListener('dragend', dragEnd);
})

function dragStart() {
  console.log('Start dragging');
}

function drag() {
  console.log('Dragging');
}

function dragEnd() {
  console.log('Dropped');
}
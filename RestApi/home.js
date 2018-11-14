'use strict';

function update(){
  let url=document.getElementById('url').value;
  let p = document.getElementById('text');
  let image = document.getElementById('roomName');

  fetch(url)
    .then(data => data.json())
    .then(room =>{
      roomName.textContent = room.name;
      p.textContent = room.roomtext;
      image.src='http://localhost:3000/images/'+room.image;
    })
    .catch(err =>{
      p.textContent ='';
      image.src='';
      roomName.textContent='error: Not Found';
    });
}

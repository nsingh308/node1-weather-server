console.log('client side javascript file...');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo =document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location = search.value;

  messageOne.textContent='Loading...'
  messageTwo.textContent=''

  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        messageOne.textContent='';
        messageTwo.textContent=data.error;
      }else{
        console.log(data.location);
        console.log(data.forcast);
        messageOne.textContent=data.location;
        messageTwo.textContent=data.forcast;
      }
    })
  })
})

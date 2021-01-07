const count=document.querySelector('#count');
const total=document.getElementById('total');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
let movieSelect=document.getElementById('movie');
let totalPrice=document.getElementById('total');
let tickets=0;
let ticketPrice=10;
const container=document.querySelector('.container');
populateUI();
updateSelectionCount();
function populateUI()
{
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!==null&&selectedSeats.length>0)
    {
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1)
            {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!==null)
    {
        movieSelect.selectedIndex=selectedMovieIndex;
    }
    ticketPrice=localStorage.getItem('selectedMoviePrice')==null?10:+localStorage.getItem('selectedMoviePrice');
    console.log(ticketPrice,localStorage.getItem('selectedMoviePrice'));
}

function setMovieData(movieIndex,moviePrice)
{
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

function updateSelectionCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    const seatsIndex=[...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    console.log(seatsIndex);
    tickets=selectedSeats.length;
    count.innerText=tickets;
    totalPrice.innerText=tickets*ticketPrice;
    
}


container.addEventListener('click',(event)=>{
    if(event.target.classList.contains('seat')&&!event.target.classList.contains('occupied'))
    {
        event.target.classList.toggle('selected');
        updateSelectionCount();
    }
});
movieSelect.addEventListener('change',(event)=>{
    ticketPrice=+event.target.value;
    setMovieData(event.target.selectedIndex,event.target.value);
    updateSelectionCount();
});
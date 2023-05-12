$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

  //event listeners
  $('#playerInput').on('submit', addGuess);
  

}

function getGuess() {
  //getting guesses from the server with ajax
  $.ajax({
    method: 'GET',
    url: '/guesses'
  }).then(function(response){  // this function will hold the data we get from the server
    console.log('success', response);
    renderToDom(response) ///???
  }).catch(function(error){ //this will catch any error and show it at the dom
    alert('request failed!'); 
    console.log('request failed:', error)
    console.log(response)
  })
}

  //bellow function will make sure we get our previous guesses listed
  function renderToDom(guesses){
    console.log(guesses)
    $('#guesses').empty(); //we take guesses list and empty it so we can input new ones
    for(let guess of guesses) {//we loop through the guess list and spit out the player name and number
      $('#guesses').append(`
      <li> Sabina Guess: ${guess.sabinaGuess} Ismail Guess: ${guess.ismailGuess}</li>
      `)

    }

  }
 let roundCount = 0;
  function addGuess(event){
    event.preventDefault() //this will prevent browser to refresh and it will hold our values
    //defining our inputs
    const sabinaGuess = $('#numOne').val(); 
    const ismailGuess = $('#numTwo').val();

    //clear input
    $('#numOne').val('');
    $('#numTwo').val('');

    //counter starts when submit button is pressed

    roundCount++;
    $('#roundCounter').text(roundCount)

    $.ajax({ //ajax is requesting post from server
      method: 'POST',
      url: '/guesses',
      data:{
        ismailGuess: ismailGuess,
        sabinaGuess: sabinaGuess
      }
    
    }).then(function(response){ //when in post we dont need to worry about response
        console.log('yay it works')
        getGuess()

    }).catch(function(error){
      alert('error with guesses post');
      console.log('error with post', error);
  
  }) 



  }
  
  



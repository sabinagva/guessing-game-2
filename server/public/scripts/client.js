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
    URL: '/guesses'
  }).then(function(response){  // this function will hold the data we get from the server
    console.log('success', response);
    renderToDom(response)
  }).catch(function(error){ //this will catch any error and show it at the dom
    alert('request failed!'); 
    console.log('request failed:', error)
  })

  //bellow function will make sure we get our previous guesses listed
  function renderToDom(guesses){
    $('#guesses').empty(); //we take guesses list and empty it so we can input new ones
    for(guess of guesses) {//we loop through the guess list and spit out the player name and number
      $('#guesses').append(`
      <li>guess number: ${playerGuesses.guess} player name: ${playerGuesses.player}</li>
      `)

    }

  }
 let roundCount = 0;
  function addGuess(event){
    preventDefault(event) //this will prevent browser to refresh and it will hold our values
    //defining our inputs
    const playerOneNumber = ('#numOne').val(); 
    const playerTwoNumber = ('#numTwo').val();

    //clear input
    ('#numOne').val('');
    ('#numTwo').val('');

    //counter starts when submit button is pressed

    roundCount++;
    $('#roundCounter').text(roundCount)

    $.ajax({ //ajax is giving (posting) data to server
      method: 'POST',
      url: '/guesses',
      data:{
        playerOne: playerOneNumber,
        playerTwo: playerTwoNumber
      }
    
    }).then(function(response){ //when in post we dont need to worry about response
        console.log('yay it works')
        getGuess()

    }).catch(function(error){
      alert('error with guesses post');
      console.log('error with post', error);
  
  }) 



  }
  
  addGuess()
}


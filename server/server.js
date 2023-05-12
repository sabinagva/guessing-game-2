const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;


let playerGuesses = [
  {ismailGuess: '1', sabinaGuess: '2'}
  
]


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

function getRandomNum () {
  return Math.random() * (25 - 1) + 1;
}

// GET & POST Routes go here
//getting it for the client
app.get('/guesses', function(req,res){
  console.log('request for the guesses was made');
  res.send(playerGuesses) //this will give us player guesses
  console.log(playerGuesses);
})
//posting to the client
app.post('/guesses', function(req,res){
  console.log('post my guesses', req.body);
  playerGuesses.push(req.body); //so we can push new guess 
  res.sendStatus(201) //server response
  console.log(playerGuesses)
  randomNumComparison()
})


//Random number function
function randomNumComparison(playerGuesses){
  let randomNumber = getRandomNum()
  if(( randomNumber === playerGuesses.ismailGuess) || (randomNumber === playerGuesses.sabinaGuess)){
    return 'Yay you are the winner!'

  }
  else if((randomNumber < playerGuesses.sabinaGuess) || (randomNumber < playerGuesses.ismailGuess)){
    return 'Your are too high relax!!!'
  }
  else if((randomNumber > playerGuesses.sabinaGuess) || (randomNumber > playerGuesses.ismailGuess)){
    return 'You are too low loser!'
  }
}


//get number 
// app.get('/randomNumber', function(req,res){
//   console.log('request for the random numbers were made');
//   res.send() //this will give us numbers from random number generator
// })
// //post number
// app.post('/randomNumber', function(req,res){
//   console.log('post my random numbers', req.body);
//   playerGuesses.push(req.body); //so we can push new numbers from our function
//   res.sendStatus(201) //server response
// })




app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

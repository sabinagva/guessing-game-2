const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;


let playerGuesses = [
  {player:'Ismail', Guess: '1'},
  {player:'Sabina', Guess: '2'}
]


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

function getRandomNum (min, max) {
  return Math.random() * (max - min) + min;
}

// GET & POST Routes go here
//get
app.get('/guesses', function(req,res){
  console.log('request for the guesses was made');
  res.send(playerGuesses) //this will give us player guesses
})
//post
app.post('/guesses', function(req,res){
  console.log('post my guesses', req.body);
  playerGuesses.push(req.body); //so we can push new guess 
  res.sendStatus(201) //server response
  
})


//Random number function
function randomNumComparison(){
  let randomNumber = getRandomNum()
  if( randomNumber === playerGuesses.Guess){
    return ''

  }
  if(randomNumber < playerGuesses.Guess){
    return ''
  }
  if(randomNumber > playerGuesses.Guess){
    return ''
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

import React, { useState, useEffect } from 'react';
import axios from 'axios'; //import axios
const API_TOKEN = import.meta.env.VITE_API_TOKEN; //.env for api token, i need to import it

//definte the const for the game
// set usestates
const wordQuest = () => {
  const [gameId, setGameId] = useState(null);
  const [maskedWord, setMaskedWord] = useState('');
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

//***************************************
 //use the useEffect to start a new game
 // similar to previous codes already used
  useEffect(() => {
    startNewGame();
  }, []);


  // TRY FOR THE LOGIC FOR NOW
  // NEED TO FINALIZE ENDPOINTS AND CHECK IF THEY WORK WITH THE LOGIC
  // THIS IS A DRAFT - IT DOES NOT WORK STILL 



  //********************* */
  // this is stll a bit random bc endpoints not completely done yet
  // we need to make sure the backend runs how we want it to make sure the game logic works here too

  //i need to generate a random word with the API
  // we set on an API that randomly generates words 
  // i decided to put the lenght for 7 just as a draft
  // but how do i filter which words can be used? some of them can be offensive
  // consider: create an array with a list of X words that can be used instead? maybe this is easier too?
  // isn't this better?
  const getRandomWord = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        //authorization bearer/TOKEN - to be checked later 
        //copied this from previous code - does this work here too?
        // following the same steps or different?
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };
  
    try {
      const response = await axios.request(options);
      return response.data[0]; //i assume the API returns an array of words, take the first one [0]?
    } catch (error) {
      console.error(error);
      return null;
    }
  };

//***********************************/
  // this is stll a bit random bc endpoints not completely done yet

  //to start a game i need to fetch a new random word
  // from the API or the array 
  // i need to send a post request to create a new game 
  // not sure about this
  const startNewGame = async () => {
    try {
      const randomWord = await getRandomWord();
  
      if (randomWord) {
        const response = await fetch('/participants/1/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'Player', solution: randomWord.solution }), //.solution right?
        });
  
        const gameData = await response.json();
        setGameId(gameData.gameId);
        displayMaskedWord(randomWord.solution);
      } 
    } catch (error) {
      console.error(error);
    }
  };

  //******************************* */

  //with this i should be able to MASK the word fetched
  // then i need to show just the first and last letter
  const displayMaskedWord = (word) => {
    // not sure how to do this
  };

//************************************/
  // this is stll random bc endpoints not completely done yet

  // i need to communicate to the backend again and send back the user's guess
  // this is to check if the guess is correct with a post method

  const submitGuess = async () => {
    try {
      const response = await fetch(`/games/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess }),
      });

      const resultData = await response.json();
      setResult(resultData.correct ? 'Correct! You guessed right!' : 'Incorrect! Try again.'); // do we give them the option to try again? to discuss

    } catch (error) {
      console.error(error);
    }
  };
//************************************* */

  // return statement
  // button to guess and possibility to answer - just a draft

  return (
    <div>
      <h1>WordQuest</h1>
      <p>{maskedWord}</p>
      <label htmlFor="guess-input">Your Guess:</label>
      <input
        type="text"
        id="guess-input"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={submitGuess}>Submit Guess</button>
      <p>{result}</p>
    </div>
  );
};

export default wordQuest;

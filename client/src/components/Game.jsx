import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// set new states
const WordQuest = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedWord, setGuessedWord] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3); //number of total attempts 
  const [result, setResult] = useState('');
  const [participatedGames, setParticipatedGames] = useState([]); //to store participatedGame IDs
  const [userPoints, setUserPoints] = useState(0); //to keep track of user points
  const [guesses, setGuesses] = useState([]); // State to store guessed words
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // New state variable////
  const { id } = useParams();// Fetch the game ID from route parameters using useParams
  const { gameId } = useParams();

//******************************************************************************************************************** */
 
 // IT WORKS 

 //here i need the useEffect to fetch a list of words from the API
 //to do so, i need to use axios and it needs to change the word every time the currentWordIndex changes
 // then i need to store the words used in their variable and i need to call the masked word for the first round
 
 /*
 useEffect(() => {
  //fetching words from the API
  const fetchWords = async () => {
   try {
    const response = await axios.get('https://random-word-api.vercel.app/api?words=10&length=5');
    const fetchedWords = response.data; //fetch words
    setWords(fetchedWords); //new state with data
    initializeMaskedWord(fetchedWords[currentWordIndex]);
   } catch (error) {
    console.error(error);
   }
  };
  fetchWords();
 }, [currentWordIndex]);
*/

 useEffect(() => {
  const fetchGameDetails = async () => {
    try {
      const token = localStorage.getItem('token');// Retrieve token from local storage        
      if (!token) {// Check if token exists
        throw new Error('Token not found in local storage.');
      }
  
      //const userId = decode(token);// Decode the token to get the user ID  
      const config = {// Attach token to request headers
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`/api/games/${id}`, config); // Fetch game details using the game ID
      const fetchedWord = response.data.solution; // Extract the word from the game details response
      console.log(fetchedWord);
      setWords(prevWords => {
        const newWords = [...prevWords]; // Copy the previous words array
        newWords[currentWordIndex] = fetchedWord; // Update the word at the currentWordIndex
        return newWords; // Return the updated words array
      });
      initializeMaskedWord(fetchedWord); // Initialize the masked word with the fetched word
    } catch (error) {
      console.error(error); // Log any errors that occur during fetching
    }
  };

  fetchGameDetails(); // Call the fetchGameDetails function when the component mounts or when the game ID changes
}, [currentWordIndex]); // Trigger useEffect when the currentWordIndex changes


//******************************************************************************************************* */

// IT WORKS

//use _ for all the letters except for thew first letter word[0] and the last letter [word-lenght -1]
// i need to make sure that all the letters are masked except for the FIRST and LAST
// to do this i need to do _ and repeat it for the word.length except 2 spots

  const initializeMaskedWord = (word) => {
    const initialMaskedWord = word[0] + '_'.repeat(word.length - 2) + word[word.length - 1];
    setMaskedWord(initialMaskedWord);
  };

/*
const initializeMaskedWord = (word) => {
  if (word) { // Ensure word is defined before initializing masked word
    const initialMaskedWord = word[0] + '_'.repeat(word.length - 2) + word[word.length - 1];
    setMaskedWord(initialMaskedWord);
  }
};
*/
  //****************************************************************************************************** */

// IT WORKS

// if else statement for the guessed word 
// if it matches well done, if not another guess

// after each guess you have one less attempt
//if you reach 3 guesses then you lose the game and try again tomorrow
// keep track of guesses and if the guessed word is correct and matched the actual word
 
const handleGuessSubmit =  async () => {
    //i need to get the word from the array using the wordIndex and then use lowercase to be insensitive when typing
    //look at previous exercise game
    const currentWord = words[currentWordIndex].toLowerCase();
    //i need to check if the guessed word matches the actual word
    // if it matches display congrats
    // if not you failed
    if (guessedWord.toLowerCase() === currentWord) {
      //adding pointing system depending on attempts
      setResult(`Well done, you guessed the word: ${currentWord}!`);
      const pointsEarned = (attemptsLeft === 3 ? 10 : attemptsLeft === 2 ? 5 : attemptsLeft === 1 ? 1 : 0);
      setUserPoints(userPoints + pointsEarned); // Add points to user
      setIsAnswerSubmitted(true); // Mark the answer as submitted////
      //
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage.');
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await axios.put(`/api/participation/play/${id}`, {
          userId: token, // Implement this function to retrieve userId
          score: userPoints,
          completedAt: new Date().toISOString()
        }, config);
      } catch (error) {
        console.error('Error updating participation:', error);
      }//
    } else {
      // also if the guessed word does not match the actual word i have one attempt less
      //i need to DECREASE the number of attempts left by 1 each time
      // after the last attempt then i should display the try again tomorrow message
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft === 1) {
        setResult(`You failed! The word was: ${currentWord}.`);
      } else {
        // but if i have attempts left then i need to call another function
        // i want to be able to reveal a new letter after each attempt
        revealNextLetter(currentWord);
      }
    }
     //store the guessed word
     setGuesses([...guesses, guessedWord]);
     setGuessedWord(''); // clear the input field after each guess
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuessSubmit();
    }
  };

  //******************************************************************************************************** */

  // FUNCTION FOR NEXT LETTER

  const revealNextLetter = (word) => {
    // like before, i need to split the maskedword and create a new arr
    // if i split it then i am able to access each letter
    //like before i need to show only the FIRST and LAST letter
    const newMaskedWord = maskedWord.split('');
    const revealedLetters = maskedWord.split('').filter(char => char !== '_').length - 2; //this excludes first and last letter
    //then i need to check if all the letters in the word have been revelead
    //so if the number is greater or eqaul to word.length - 2 (considering FIRST and LAST) it means all the letters are out
    //i dont need to reveal anything more
    if (revealedLetters >= word.length - 2) return; // All letters revealed
   // i need to put index to 1 becuase 0 is the first letter
    // i need a while loop thorugh the newMaskedWord arr 
    //this needs to continue until you find a _ or when i reach the end of the word (last letter)
    //i need to check if the char is not an _ 
    // also need to check if the index is less thant the length of the hidden word -1 (this is the last letter)
    // then i can move to the next char in the index with ++
   let index = 1;
    while (newMaskedWord[index] !== '_' && index < newMaskedWord.length - 1) {
      index++;
    }
    //update the masked word at _ with the letter of the word
    newMaskedWord[index] = word[index];
    //once this is done i needs to convert it back to a string with .join
    setMaskedWord(newMaskedWord.join(''));
  };
  

  //********************************************************************************************************* */

 // PARTECIPATION OF USER'S IN GAME - NOT PLAY THE SAME GAME TWICE
 //not sure about this - CHECK!!

// one endpoint in the backend - check partecipation for each game (for example: have i played game 17 already?)
// need to be able to send a response to the backend - use useEffect like Germinal suggested
// with this the user cant play the same gamme twice - this happens by checking the users partecipation status for each game
//if the user attempts to play a game they already played, a mex will show instead of adding the gameID to the participatedGames state

// does this work?

useEffect(() => {
  //check participation status for each game
  const checkParticipation = async (gameId) => {
    try {
      const response = await axios.get(`/:id/${gameId}`);
      if (response.data.message === "yes") {
        //if the user has participated in this game, display a message
        console.log(`You have already played game ${gameId}.`);
      } else {
        //if the user hasn't participated in this game, add gameId to participatedGames
        setParticipatedGames(prevParticipatedGames => [...prevParticipatedGames, gameId]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //check participation for each game in the words array
  words.forEach((_, index) => {
    checkParticipation(index);
  });
}, [words]); //trigger useEffect when the words change


// useEffect(() => {
//   if (attemptsLeft === 0) {
//     const updateParticipation = async () => {
//       try {
//         const response = await axios.put(`/api/games/play/${gameId}`, {
//           score: userPoints,
//           completedAt: new Date().toISOString(),
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error updating participation:', error);
//       }
//     };
//     updateParticipation();
//   }
// }, [attemptsLeft, userPoints]);


  //********************************************************************************************************* */


  // RETURN STATEMENT

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <p className="text-2xl font-semibold mb-4 text-purple-600">Guess Word:</p>
        <div className="flex justify-between items-center bg-gray-200 rounded-lg p-4 mb-4 border border-gray-300">
          {maskedWord.split('').map((char, index) => (
            <span key={index} className={`text-2xl ${index === 0 || index === maskedWord.length - 1 ? 'font-bold' : ''}`}>{char}</span>
          ))}
        </div>
        {attemptsLeft > 0 && (
          <div className="flex items-center mb-4">
            <p className="text-lg font-semibold mr-2">Attempts Left:</p>
            {[...Array(attemptsLeft)].map((_, index) => (
              <FaHeart key={index} className="text-red-600" />
            ))}
          </div>
        )}
        <input
          type="text"
          value={guessedWord}
          onChange={(e) => setGuessedWord(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder="Enter the word"
          className="w-full border rounded-lg py-3 px-4 text-lg text-gray-800 bg-gray-100 focus:outline-none focus:shadow-outline placeholder-gray-500 mb-4"
          disabled={result === 'Well done!' || result === 'You failed!' || attemptsLeft === 0 || isAnswerSubmitted}
        />
        <button 
          onClick={handleGuessSubmit} 
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          disabled={result === 'Well done!' || result === 'You failed!' || attemptsLeft === 0 || isAnswerSubmitted}
        >
          Submit Guess
        </button>
        <p className={`text-lg font-semibold ${result === 'Well done!' ? 'text-green-600' : result === 'You failed!' ? 'text-red-600' : ''} mb-4`}>{result}</p>
        {guesses.length > 0 && (
          <div className="flex flex-wrap items-center">
            <p className="text-lg font-semibold mr-2">Guessed:</p>
            {guesses.map((guess, index) => (
              <span key={index} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2">{guess}</span>
            ))}
          </div>
        )}
        <p className="text-lg font-semibold text-purple-600 mt-4">Your Points: {userPoints}</p>
      </div>
    </div>
  );
  
  
};

export default WordQuest;

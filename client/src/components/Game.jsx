import React, { useState, useEffect } from 'react';
import axios from 'axios';

// set new states
const WordQuest = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedWord, setGuessedWord] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3); //number of total attempts 
  const [result, setResult] = useState('');
  const [nextGameTime, setNextGameTime] = useState('');
  const [gameAvailable, setGameAvailable] = useState(true);

  
//******************************************************************************************************************** */
 
 // IT WORKS 

 //here i need the useEffect to fetch a list of words from the API
 //to do so, i need to use axios and it needs to change the word every time the currentWordIndex changes
 // then i need to store the words used in their variable and i need to call the masked word for the first round
 
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

//******************************************************************************************************* */

// IT WORKS

//use _ for all the letters except for thew first letter word[0] and the last letter [word-lenght -1]
// i need to make sure that all the letters are masked except for the FIRST and LAST
// to do this i need to do _ and repeat it for the word.length except 2 spots
  const initializeMaskedWord = (word) => {
    const initialMaskedWord = word[0] + '_'.repeat(word.length - 2) + word[word.length - 1];
    setMaskedWord(initialMaskedWord);
  };


  //****************************************************************************************************** */

// IT WORKS

// if else statement for the guessed word 
// if it matches well done, if not another guess

// after each guess you have one less attempt
//if you reach 3 guesses then you lose the game and try again tomorrow
// keep track of guesses and if the guessed word is correct and matched the actual word
  
const handleGuessSubmit = () => {
    //i need to get the word from the array using the wordIndex and then use lowercase to be insensitive when typing
    //look at previous exercise game
    const currentWord = words[currentWordIndex].toLowerCase();
    //i need to check if the guessed word matches the actual word
    // if it matches display congrats
    // if not you failed
    if (guessedWord.toLowerCase() === currentWord) {
      setResult(`Well done, you guessed the word: ${currentWord}!`);
    } else {
      // also if the guessed word does not match the actual word i have one attempt less
      //i need to DECREASE the number of attempts left by 1 each time
      // after the last attempt then i should display the try again tomorrow message
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft === 1) {
        setResult(`You failed! The word was: ${currentWord}. Try again tomorrow.`);
      } else {
        // but if i have attempts left then i need to call another function
        // i want to be able to reveal a new letter after each attempt
        revealNextLetter(currentWord);
      }
    }
  };



  // with the styling: we need to show the currentWord either bold or another colour
  // how to do this?

  //******************************************************************************************************** */

  // FUNCTION FOR NEXT LETTER
  //difficult - does not work as i want to

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

  // RETURN STATEMENT


  return (
    <div className="flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md max-w-md">
     
        <p>Today's Word: {maskedWord}</p>
        <p>Attempts Left: {attemptsLeft}</p>
        <input
          type="text"
          value={guessedWord}
          onChange={(e) => setGuessedWord(e.target.value)}
          placeholder="Enter the word"
        />
        <button onClick={handleGuessSubmit}>Submit Guess</button>
     
        <p>{result}</p>
      </div>
    </div>
  );
};
export default WordQuest;

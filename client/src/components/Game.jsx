import React, { useState, useEffect } from 'react';
import axios from 'axios';

//here i set the states i need for the game to work

const WordQuest = () => {
 const [words, setWords] = useState([]);
 const [currentWordIndex, setCurrentWordIndex] = useState(0);
 const [guessedLetters, setGuessedLetters] = useState([]);
 const [maskedWord, setMaskedWord] = useState('');
 const [guess, setGuess] = useState('');
 const [result, setResult] = useState('');


 //******************************************************************************************************************** */


 // IT WORKS


 //here i need the useEffect to fetch a list of words from the API
 //to do so, i need to use axios and it needs to change the word every time the currentWordIndex changes
 // then i need to store the words used in their variable and i need to call the masked word for the first round

 useEffect(() => {
  //fetching words from the API - this should work
  const fetchWords = async () => {
   try {
    const response = await axios.get('https://random-word-api.vercel.app/api?words=10');
    const fetchedWords = response.data; //fetch words
    setWords(fetchedWords); //new state with data
    initializeMaskedWord(fetchedWords[currentWordIndex]);
   } catch (error) {
    console.error(error);
   }
  };
  fetchWords();
 }, [currentWordIndex]);


//************************************************************************************************************************ */


// IT WORKS


//i need to MASK or HIDE the word fetched
// and i need to only show the FIRST and LAST letter of the word

 const initializeMaskedWord = (word) => {
  //to display only the first and last letter of each word
  const initialMaskedWord = word
   .split('') // transform the word into an array of letters
   .map((letter, index) => // map through each letter
   //if the letter is the FIRST (so 0) or the LAST (so total length - 1) or if the letter has been GUESSED = then i display
   // else = display "_" to still guess
    index === 0 || index === word.length - 1 || guessedLetters.includes(letter.toLowerCase()) //needs toLowerCase. check previous examples
     ? letter
     : ' _ ' // to add a _ _ instead of letters. put spaces in between
   )
   .join(''); // then i need to join the letters back together to form the word back
   // then i need to set the new state oif the MASKED word with the GUESSED masked word
  setMaskedWord(initialMaskedWord);
 };


//******************************************************************************************************************************** */


// DOES NOT WORK


// handleGuessSubmit to submit the guessed word or letter
// i need toLowerCase to ensure insensitivity to the guess like in previous exercises

 const handleGuessSubmit = () => {
  const currentWord = words[currentWordIndex].toLowerCase();
  // Update guessed letters?? NOT SURE ABOUT THIS. IT DOES NOT WORK
  // how do i update the gussed letters into the original fetched word so the user can guess again?
  const updatedGuessedLetters = [...guessedLetters, guess.toLowerCase()];
  //set to new state
  setGuessedLetters(updatedGuessedLetters);
  // to check if the guessed word or letter is in the word - use map, split and length to divide the word into letters and check like before
  const updatedMaskedWord = currentWord
   .split('') //split into an array of letters like simone suggested
   .map((letter, index) => // need to map through each letter
    // if the letter is either the FIRST or the LAST or any letter GUESSED, i keep the letter
    // if it is not, put and or keep "_"
   index === 0 || index === currentWord.length - 1 || updatedGuessedLetters.includes(letter) // this is for the letters guessed
     ? letter
     : '_'
   )
   .join('');
   //after the guess set it to a new state: setMaskedWord
   // this should display the updated version of the word IT DOES NOT WORK
  setMaskedWord(updatedMaskedWord);
  // to check if the word has been guessed or not
  // if the word does not have any single "_" then the word have been guessed: display message
  // then set a new state for the new guess
  if (!updatedMaskedWord.includes('_')) {
   setResult('Well done, you guessed the word!');
   setGuess('');
  }
 };


 //****************************************************************************************************************************** */


 // IT WORKS


 // MAYBE NOT NEEDED - JUST TRYING THINGS OUT ATM
 // TO CHECK IF WE WANT TO USE ROUNDS - A ROUND OF 3 WORDS PER DAY?


 // possibility to go to the next word and guess again. do we want this?
 // this can be otional
 // i need to make sure it resets the word once you skip to the next one
 // and it also needs to reset the guesses from the user


 const handleNextWord = () => {
  // Move to the next word in the list
  if (currentWordIndex < words.length - 1) {
   setCurrentWordIndex(currentWordIndex + 1);
   initializeMaskedWord(words[currentWordIndex + 1]);
   setResult('');
   setGuessedLetters([]); //reset guessed letters for the new word
  } else {
   setResult('You have completed all the words!');
  }
 };

 
 //************************************************************************************************************************** */


  //return statement
  //JUST A DRAFT


  //handleGuessSubmit - once it is submit you need to call the word that is fetched
  // before the split method - the word should appeared from the state (first function)


 return (
  <div>
   <h2>WordQuest</h2>
   <p>Today's Word: {maskedWord}</p>
   <p>You guessed: {guessedLetters.join(', ')}</p>
   <input
    type="text"
    value={guess}
    onChange={(e) => setGuess(e.target.value)}
    placeholder="Enter a letter or a word"
   />
   <button onClick={handleGuessSubmit}>Submit Guess</button>
   <button onClick={handleNextWord}>Next Word</button>
   <p>{result}</p>
  </div>
 );
};
export default WordQuest;
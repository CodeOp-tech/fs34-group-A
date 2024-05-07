import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';//
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

/*
  1. Need a section Create Group button, so when clicked : 
      (a) Input Containers to Add Email Address (Add email buttons)
      (b) Send Invitation button like a handlesubmit button, so when clicked: 
          - Sends a post request to endpoint=>  router.post("/", userShouldBeLoggedIn, async (req, res, next). & send invitation also!
  2. Need My Invitations section : 
      (a) Displays all invitations with a join button next to it=> with an endpoint where it fetches participation where it is null.
      (b) When clicked, redirects to the game/:id page.

  3. Section for Quests Played : 
      (a) Displays a section which shows the number of games played. So participation table based on user id, where completed at !== null. 

  4. Section for Total Points : 
      (a) Displays a section which shows the number of games played. So use get endpoint to access score based on userID a

*/


const Profile = () => {
  const [groupCreated, setGroupCreated] = useState(false); // Manages whether the group creation section is visible or not.
  const [emails, setEmails] = useState(['']); // State to store email addresses
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  
/*
    1. Use Effect to fetch all invitations!
    2. Fetch gameIds function: 
        (a) Retrieve the token from Local Storage     - const token = localStorage.getItem('token');
        (b) Check if the token exists!                - if (!token) { throw new Error..}
        (c) Decode the token to extract userId information from it. 
        (d) Extract User ID from Decoded Token        - const userId = decodedToken.userId;
        (e) Attach Token to Request Headers (just like in postman)
        (f) Fetch invitation using the userId - fetch invitations for the specific userId.
        (g) Update the state with the data received from the API response - aka game info 

    3. Eventhandler when the "join game" button is clicked, it shall redirect you to the gameId page!
*/
    useEffect(() => {
    // Fetch invitations when the component mounts
    const fetchInvitations = async () => {
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
          
        const response = await axios.get(`/api/participation/invitations`, config);// Fetch invitations using the user ID from the token
        setInvitations(response.data);// Update state with invitations data
      } catch (error) {// Handle errors
        console.error('Error fetching invitations.', error.message);
      }
    };

    fetchInvitations();// Call the fetch function when component mounts
  }, []);// Empty dependency array ensures the effect runs only once

  const handleJoinGame = (gameId) => { //Event handler for when the "Join Game" button is clicked
    navigate(`/game/${gameId}`);// Redirect to the game/:id page using navigate//tbc
  };

/*
    1. Section for creating a group/new game!
    2. Need a handlesubmit function to send a post request. 
    3. Handlers for adding, removing and updating the setters! (One does not simply mutate an array!!!)
*/
  const handleEmailChange = (index, event) => {// Updates the email address in the state when the user types in the input field.
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {//Adds a new input field for entering email addresses.
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index) => {// Removes an input field for entering email addresses.
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleSubmit = async (event) => {// Handles form submission. Sends a POST request to the backend API with the entered email addresses.
    event.preventDefault();
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
      // Send request to create group with emails
      const response = await axios.post('/api/games', { emails }, config);
      console.log(response.data);
      setGroupCreated(true);
      setSuccessMessage('Invitation sent successfully!'); 
      window.alert('Invitation sent successfully!');
      window.location.reload(); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleSolo = async (event) => {// Handles form submission. Sends a POST request to the backend API with the entered email addresses.
    event.preventDefault();
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
      // Send request to create group with emails
      const response = await axios.post('/api/games/solo', {}, config);
      console.log(response.data);
      navigate(`/game/${response.data.id}`);// Navigate to the newly created gam
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
        const response = await axios.get(`/api/participation/played`, config);
        setTotalGamesPlayed(response.data.totalGamesPlayed);
        setTotalScore(response.data.totalScore);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="min h-lg flex items-center justify-center">
    <div className="w-full max-w-md">
    <div className="mb-4">
       
    <div>
          {/* Solo Game Section */}
          <button onClick={handleSolo} className=" block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
            Solo Player
          </button>
        </div>
        </div>

        {/* Create Group Section */}
        <div className="mb-4">
        {/* <h3 className="underline text-lg font-semibold mb-4 text-white">Create Group</h3> */}
        <div className="mb-4">
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>} {/* Display success message */}
    
        {!groupCreated && (
        <div>
          <button onClick={() => setGroupCreated(true)} className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
            Play with a Group
          </button>
        </div>
      )}
          {groupCreated && (
            <form onSubmit={handleSubmit}>
              {emails.map((email, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input type="email" name="user_email" value={email} onChange={(event) => handleEmailChange(index, event)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 mb-4 mr-4"required/>

                  <button type="button" onClick={() => handleRemoveEmail(index)} className="bg-transparent hover:bg-red-700 text-pink-200 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded mb-4">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddEmail}className="bg-transparent hover:bg-purple-700 text-pink-200 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded mr-4"> Add Email </button>

              <button type="submit"className="bg-transparent hover:bg-pink-700 text-pink-200 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded ml-5">Send Invitation</button>
            </form>
          )}
        </div>

        {/* My Invitations Section */}
        <div className="mb-4">
          <h3 className="underline text-lg font-semibold mb-2 text-white mt-2">My Invitations</h3>
          {invitations.map(invitation => (
            <div key={invitation.id} className="flex items-center justify-between border-b border-gray-300 py-2">
              <div>
              <span className="text-white text-l mb-6">{invitation.Game.User.username}</span> {/* Display username */}
              </div>
              <button 
                onClick={() => handleJoinGame(invitation.gameId)}
                className="bg-transparent hover:bg-pink-700 text-pink-200 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
              >
                Join Game
              </button>
            </div>
          ))}
        </div>
       
        {/* Other Profile Content */}
        <form>
  <div className="mb-4">
    <h3 className="underline text-lg font-semibold mb-2 text-white mt-2">My Totals</h3>
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <div>
        <label htmlFor="username" className="text-lg font-semibold mr-4 text-white mt-2">
          Total Quests Played
        </label>
      </div>
      <div className="text-white text-l ml-20 text-right"> {/* Added ml-2 for left margin */}
        {totalGamesPlayed}  
      </div>
    </div>
  </div>
  
  <div className="mb-4">
   
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <div>
        <label htmlFor="username" className="text-lg font-semibold mr-4 text-white mt-2">
          Total Score
        </label>
      </div>
      <div className="text-white text-l ml-20 text-right"> {/* Added ml-2 for left margin */}
        {totalScore}
      </div>
    </div>
  </div>
</form>
      </div>
    </div>
    </div>
  );
};

export default Profile
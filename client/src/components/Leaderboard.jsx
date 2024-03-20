import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
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
            const response = await axios.get(`/api/participation/scores`, config);
            setLeaderboardData(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    
      return (
        <div className="min-h-lg flex items-center justify-center">
          <div className="w-full max-w-md overflow-hidden inline-block">
    
            {/* Leaderboard Section */}
            <div className="mb-4">
              <h3 className="underline text-lg font-semibold mb-2 text-white mt-2">Leaderboard</h3>
              <table className="w-full">
                
                <tbody>
                  {leaderboardData.map((data, index) => (
                    <tr key={index}>
                      <td className="text-white">{data.User && data.User.username ? data.User.username : 'N/A'}</td>
                      <th className="text-white">Played</th>
                      <td className="text-white">{data.totalGamesPlayed === 0 ? 'N/A' : data.totalGamesPlayed}</td>
                      <th className="text-white">Score</th>
                      <td className="text-white">{data.totalScore === null ? 'N/A' : data.totalScore}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
    
    export default Leaderboard;
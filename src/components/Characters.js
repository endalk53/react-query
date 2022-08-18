import React, { useState } from 'react'
import {useQuery} from "react-query"
import Character from './Character';

export default function  Characters()  {

  const [page, setPage] = useState(1);
  const fetchCharacters = async ({queryKey}) => {
    
    
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
      );
  return response.json();
  
};

  const {data, status,isLoading, isError, isPreviousData} = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true, 
  });  

  console.log(isPreviousData);


 if(isLoading){
  return <div>Loading...</div> 

 }

 if(isError) {
  return <div>Error</div>
 } 
 
  return (
    <div className='characters'>
      {data.results.map((character) => (
       <Character character ={character} />
      ))}

      <div>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={isPreviousData && !data.info.next} onClick={() => setPage(page + 1)}>Next</button>
       
      </div>
  
  </div>

  ) 
   
  
  
}


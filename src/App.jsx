import { useState, useEffect } from 'react'
import './App.css'

function usePersonSearch() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:4000?' + new URLSearchParams({ q })
    );

    const data = await response.json();
    // console.log(data);
    setPeople(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, people }
}

function App() {
  const { search, people } = usePersonSearch();

  return (
    <div className="App">
      <h1>Search Profession</h1>

      <input
        type='text'
        placeholder='Search'
        onChange={(e) => search(e.target.value)}
      />

      <ul>
      {people.map((person) => (
        <Person key={person.id} {...person} />
      ))}

        {people.length === 0 && 'No people found.'}
      </ul>
    </div>
  )
}

function Person({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old.)
    </li>
  )
}

export default App

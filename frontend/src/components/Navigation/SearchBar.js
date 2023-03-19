import React , { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import List from './List';

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const location = useLocation();

  useEffect(() => {
    setInputText('');
  }, [location]);

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    setInputText(value);
  };

  return (
    <div>
      <div className="search" style={{ width: '30rem' }}>
        <TextField
          id="outlined-basic"
          onChange={handleInput}
          value={inputText}
          variant="outlined"
          fullWidth
          label="Search for a city"
        />
      </div>
      <List input={inputText} />
    </div>
  );
}

export default SearchBar;

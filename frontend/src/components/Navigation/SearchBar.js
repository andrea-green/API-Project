import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import List from './List';

function SearchBar() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }
    return (
        <div>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search for a city"
                />
            </div>
            <List input={inputText}/>
        </div>
    );
}

export default SearchBar;

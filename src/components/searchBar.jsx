import React, { useState,useEffect } from 'react';
import './searchBar.css';
import { allSuggestions } from '../constants/allSuggestion';
import crossIcon from './../assets/crossIcon.svg'
const Autocomplete = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedSuggestions, setSelectedSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [usedNames, setUsedNames] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    useEffect(() => {
      const filteredSuggestions = allSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase()) && !usedNames.includes(suggestion.name)
      );
  
      setSuggestions(filteredSuggestions);
    }, [inputValue, usedNames, allSuggestions]);
    // using allSuggestions in the dependency array ,as currently in the given assignment we have allSuggetions constant but if in near future we change it on some api data.
    const handleSuggestionClick = (suggestion) => {
      setSelectedSuggestions([...selectedSuggestions, suggestion]);
      setInputValue('');
      setUsedNames([...usedNames, suggestion.name]);
      setShowSuggestions(false)
    };
  
    const handleRemoveSelected = (removedSuggestion) => {
      const updatedSelectedSuggestions = selectedSuggestions.filter(suggestion => suggestion !== removedSuggestion);
      const updatedUsedNames = usedNames.filter(name => name !== removedSuggestion.name);
  
      setSelectedSuggestions(updatedSelectedSuggestions);
      setUsedNames(updatedUsedNames);
      setShowSuggestions(false)
    };
  
    return (
      <div>
        <div className='searchContainer'>
          {selectedSuggestions.map((selectedSuggestion, index) => (
            <div key={index} className="selected-suggestion">
                <img className='smallImg'src={selectedSuggestion.photo} alt={selectedSuggestion.name} />
                <div className='nameStyle'>{selectedSuggestion.name}</div>
                <div className="custom-cross-icon" onClick={() => handleRemoveSelected(selectedSuggestion)}>
                    <img src={crossIcon} alt='close'></img>
                </div>
            </div>
          ))}
            <span className='suggetionsContainer'>
                {/* we can apply debounce here in case to avoid multiple capi call in real case scenario*/}
                <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new user..."
                onClick={()=>{setShowSuggestions(true)}}
                />
                {showSuggestions && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        <div>
                        <img src={suggestion.photo} alt={suggestion.name} />
                        <span>{suggestion.name}</span>
                        </div>
                        <div>{suggestion.email}</div>
                    </li>
                    ))}
                </ul>
                )}
            </span>
        </div>
      </div>
    );
  };
  
  
export default Autocomplete;

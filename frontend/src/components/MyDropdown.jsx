import { useState, useRef, useEffect } from 'react'
import './MyDropdown.css'

const MyDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // make sure options is always an array even if it's undefined
  const safeOptions = Array.isArray(options) ? options : [];

  // find the selected option's name to display
  const selectedLabel = safeOptions.find(option => option.value === value)?.label || placeholder;

  // handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div 
        className={`dropdown-header ${!value ? 'placeholder' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-options">
          {placeholder && (
            <div 
              className={`dropdown-option ${!value ? 'selected' : ''}`} 
              onClick={() => handleOptionClick('')}
            >
              {placeholder}
            </div>
          )}
          
          {safeOptions.map((option) => (
            <div
              key={option.value}
              className={`dropdown-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDropdown
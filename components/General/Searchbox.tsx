import { FC, useState } from 'react';

interface SearchboxProps {
  ariaLabel?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const Searchbox: FC<SearchboxProps> = ({ ariaLabel, placeholder, onChange: setExternalSearchTerm, value: externalSearchTerm }) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExternalSearchTerm ? setExternalSearchTerm(e.target.value) : setInternalSearchTerm(e.target.value);
  };

  return (
    <div className="searchbox">
      <input
        type="text"
        value={externalSearchTerm || internalSearchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel || 'search-box'}
      />
    </div>
  );
}; 

export default Searchbox;
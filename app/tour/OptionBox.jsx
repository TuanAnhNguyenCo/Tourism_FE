'use client';
import React, { useState } from 'react';

const OptionBox = ({setHaveLocation}) => {
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleCheckboxChange = (option, label) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  
    setHaveLocation((prevHaveLocations) => {
      // If the option is checked, remove the label
      if (options[option]) {
        return prevHaveLocations.filter((item) => item !== label);
      } else {
        // If the option is unchecked, add the label
        return [...prevHaveLocations, label];
      }
    });
  };
  
  
  return (
    <div className="  border border-gray-300 p-4 rounded-md  float-left ml-16 mt-14">
      <h2 className="text-lg font-semibold mb-4">ツアータイプ</h2>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option1"
          checked={options.option1}
          onChange={() => {
            handleCheckboxChange('option1', 'ホイ・アン');
          }}
          className="mr-2"
        />
        <label htmlFor="option1" className="select-none">ホイ・アン</label>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option2"
          checked={options.option2}
          onChange={() => handleCheckboxChange('option2','ビンフ・ラン・ハー')}
          className="mr-2"
        />
        <label htmlFor="option2" className="select-none">ビンフ・ラン・ハー</label>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option3"
          checked={options.option3}
          onChange={() => handleCheckboxChange('option3', 'ホー・ガオム')}
          className="mr-2"
        />
        <label htmlFor="option3" className="select-none">ホー・ガオム</label>
      </div>

      
    </div>
  );
};

export default OptionBox;

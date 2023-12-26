'use client';
import React, { useState } from 'react';

const OptionBox = () => {
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleCheckboxChange = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <div className="  border border-gray-300 p-4 rounded-md  float-left ml-16 mt-14">
      <h2 className="text-lg font-semibold mb-4">観光地タイプ</h2>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option1"
          checked={options.option1}
          onChange={() => handleCheckboxChange('option1')}
          className="mr-2"
        />
        <label htmlFor="option1" className="select-none">オプション 1</label>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option2"
          checked={options.option2}
          onChange={() => handleCheckboxChange('option2')}
          className="mr-2"
        />
        <label htmlFor="option2" className="select-none">オプション 2</label>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option3"
          checked={options.option3}
          onChange={() => handleCheckboxChange('option3')}
          className="mr-2"
        />
        <label htmlFor="option3" className="select-none">オプション 3</label>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="option4"
          checked={options.option4}
          onChange={() => handleCheckboxChange('option4')}
          className="mr-2"
        />
        <label htmlFor="option4" className="select-none">オプション 4</label>
      </div>
    </div>
  );
};

export default OptionBox;

import React from 'react';

const PriceInput = ({setPrice}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md float-left inline-block ml-5 mt-20 border border-gray-300">
      <h1 className="text-2xl font-semibold mb-4">価格帯</h1>
      <div className="flex items-center">
        <input
          type="number"
          id="price"
          name="price"
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="¥ 0 ~ 1万"
          onChange={e => setPrice(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PriceInput;
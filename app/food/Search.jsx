import React from 'react';

function Search({setName}){
    return (
      <div className="flex items-center bg-white shadow-md p-2 rounded border border-gray-500 w-full">
        <input
          type="text"
          placeholder="名前、値段, .."
          className="border-none outline-none px-3 py-1 flex-grow"
          onChange={e => setName(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
        >
          検索
        </button>
      </div>  
    )
}

export default Search




            // <a class="inline-block rounded border border-blue-500 px-10 py-3 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
            // href="/download">
            // Search
            // </a>
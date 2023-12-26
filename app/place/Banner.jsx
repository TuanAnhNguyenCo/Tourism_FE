import React from 'react';
import Search from './Search';

export default function Banner({setName}) {
    return (
        <>
            <div className=" relative banner mb-10">
                <img
                    src="https://images2.thanhnien.vn/528068263637045248/2023/6/4/screenshot-2023-06-04-at-224756-16858937361421786911492.png"
                    alt="Banner"
                    className="w-full h-64 object-cover"
                />
                
                <div className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/6">
                    <Search setName={setName}/>                
                </div>       
            </div>           
        </>
    );
}
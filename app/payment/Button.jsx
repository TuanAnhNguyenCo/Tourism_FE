'use client'
import React from 'react';
import Link from 'next/link';


function Button({onClick}) {

    const handleClick = () => {
        // Hiển thị cảnh báo khi nút được bấm
        alert("ツアーの予約が完了しました。");
    };
    return (
        <>
            {/* <Link href='/tour'> */}
            <button className="mt-6 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 float-right  transform -translate-x-1/2 -translate-y-1/2"
                    type="button"
                    onClick={handleClick}
            >
                支払う
            </button>
            {/* </Link> */}
        </>
    )
}
export default Button
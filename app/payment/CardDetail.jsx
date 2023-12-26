import React from 'react'
import Button from './Button'
import Footer from '@/app/components/Footer'

const CardDetail = () => {

    return (
        <>
            <div className='float-right w-1/2  mt-8'>

                <p>クレジット カード情報を入力します</p>


                <div className='mt-6 mb-6'>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> 合計 </label>

                    <input
                        type="email"
                        id="UserEmail"
                        
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                </div>

                <div className='mt-6 mb-6'>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> 支払回数 </label>

                    <input
                        type="email"
                        id="UserEmail"
                        
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                </div>

                <div className='mt-6 mb-6'>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> カード番号 </label>

                    <input
                        type="email"
                        id="UserEmail"
                        
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                </div>


                <div className='mt-6 mb-6'>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> セキュリティコード </label>

                    <input
                        type="email"
                        id="UserEmail"
                       
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                </div>


                <div className='mt-6 mb-6'>
                    <label htmlFor="UserEmail" className="block text-xs font-medium text-gray-700"> カード名義(ローマ字) </label>

                    <input
                        type="email"
                        id="UserEmail"
                        
                        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                </div>

            <Button/>
            </div>
            
        </>
    )
}

export default CardDetail
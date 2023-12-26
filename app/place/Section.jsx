import React from 'react';
import Link from 'next/link';

function Section(props) {

    const {id,title,desc,url} = props

    return (
        <>
            <section className="bg-gray-80 inline-block float-left w-1/3 h-96">
                <div className="bg-gray-80  container mx-auto px-4 py-4 sm:py-6 sm:px-2 lg:py-8 lg:px-4 inline-block ml-16 hover:shadow-lg h-96">
                    <div className="flex-1">
                        <Link href={`/place/detail/${id}`}>
                            <div className="relative h-48 w-64 overflow-hidden rounded-lg">
                                <img
                                    alt="Party"
                                    src={url}
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                />                           
                            </div>
                            <div className="py-2 text-gray-800">
                                <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
                                <p className="mt-1 text-gray-600 line-clamp-2 h-16 overflow-hidden" >
                                    {desc}
                                </p>
                                
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Section;

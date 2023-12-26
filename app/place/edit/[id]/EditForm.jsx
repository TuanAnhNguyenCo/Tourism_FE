'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Cookies from 'js-cookie';


export default function EditForm(props) {

  const url = window.location.href;
  const parts = url.split('/');
  const id = parts[parts.length - 1];
  //const { id } = router.query;

  const fetchData = async () => {
    try {
      const token = Cookies.get('accessToken'); // Lấy token từ cookie

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8080/location/${id}`, {
        method: 'GET',
        headers,
      });
      const jsonData = await response.json();
      setFormValue(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [id])

  const [formValue, setFormValue] = useState({
    name: '',
    location: '',
    rating: '',
    description: '',
    url: null,
    image1: null
  })

  return (
    <form className="max-w-2xl mx-auto mt-4">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">



          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <label htmlFor="place-name" className="block text-sm font-medium leading-6 text-gray-900">
                観光地
              </label>
              <div className="mt-2">
                <input
                  value={formValue.name}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      name: e.target.value
                    })
                  }}
                  type="text"
                  name="place-name"
                  id="place-name"
                  autoComplete="place-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
                  value={formValue.location}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      location: e.target.value
                    })
                  }}
                  type="text"
                  name="location"
                  id="location"
                  autoComplete="location"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                Rating
              </label>
              <div className="mt-2">
                <input
                  value={formValue.rating}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      rating: e.target.value
                    })
                  }}
                  type="text"
                  name="rating"
                  id="rating"
                  autoComplete="rating"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                詳しいスケジュール
              </label>
              <div className="mt-2">
                <textarea
                  value={formValue.description}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      description: e.target.value
                    })
                  }}
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>


            <div className="col-span-full">
              <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
              ユーアーレル
              </label>
              <div className="mt-2">
                <input
                  value={formValue.url}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      url: e.target.value
                    })
                  }}
                  type="text"
                  name="url"
                  id="url"
                  autoComplete="url"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                ツアーの動画・画像
              </label>

              {/* Upload anh 1 */}
              <div className="float-left mr-2 mt-2 w-1/3 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {
                    formValue.image1 ?
                      <img src={formValue.image1} /> :
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  }
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only"
                        onChange={(e) => {
                          let file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormValue({
                                ...formValue,
                                image1: reader.result
                              })
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>

                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>


              {/* Upload anh 2*/}
              <div className="float-left mr-2 mt-2 w-1/3 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>

                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>



              {/* Upload anh 3 */}
              <div className="mt-2 w-1/2.5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>

                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>


            </div>
          </div>
        </div>


      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">

        <button
          onClick={(e) => delete (e, formValue, id)}

          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>


        <Link href="/place">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            キャンセル
          </button>
        </Link>

        <button
          onClick={(e) => props.submitForm(e, formValue, id)}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          作成
        </button>
      </div>
    </form>
  )
}
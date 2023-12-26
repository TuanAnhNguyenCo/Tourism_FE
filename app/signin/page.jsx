"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Home() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmitForm = (e, formValue) => {
    e.preventDefault();
    console.log("Submit form", formValue);
    // after call api
    fetch("http://localhost:8080/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(formValue),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Cookies.set("accessToken", data.token, { expires: 1 });
        //console.log(data)
        window.location.href = "/tour";
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Sign-in failed. Please check your credentials.");
        // Handle errors
      });
    // redirect here
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ベトナム交流
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                イーメール
              </label>
              <div className="mt-2">
                <input
                  value={formValue.email}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      email: e.target.value,
                    });
                  }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  パースワード
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    パスワードをお忘れですか？
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={formValue.password}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      password: e.target.value,
                    });
                  }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Link href="/tour">
                <button
                  onClick={(e) => handleSubmitForm(e, formValue)}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  サインイン
                </button>
              </Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            アカウントをお持ちでない場合は{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              サインアップ
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

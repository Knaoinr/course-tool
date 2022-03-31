import React, { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStateOrAny } from "react-redux";
import Link from "next/link";
import { logIn, logOut } from "../app/auth";

export default function Header({ children }): ReactElement {
  const dispatch = useDispatch();

  // @refresh reset
  useEffect(() => {
    if (window.localStorage.getItem("course_token")) {
      dispatch({ type: "user/logIn" });
    }
  }, []);

  const loggedIn = useSelector(
    (state: RootStateOrAny) => state.user.loggedIn
  );

  return (
    <div className="relative">
      <header className="fixed inset-x-0 top-0 z-10 h-16 text-white bg-indigo-700 drop-shadow">
        <div className="flex items-center justify-between h-full p-6">
          <div className="font-semibold">
            <Link href="/">ScottyLabs Course Tool</Link>
          </div>
          <div className="flex flex-row space-x-10">
            <div>
              <Link href="/bookmarked">Bookmarked</Link>
            </div>
            <div>
              <a href="https://forms.gle/6vPTN6Eyqd1w7pqJA" target="_blank">Feedback</a>
            </div>
            {loggedIn ? (
              <div onClick={() => logOut(dispatch)}>Log Out</div>
            ) : (
              <div onClick={() => logIn(dispatch)}>Log In</div>
            )}
          </div>
        </div>
      </header>
      <main className="relative">{children}</main>
    </div>
  );
}

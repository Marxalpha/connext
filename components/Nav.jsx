"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setup();
  }, []);

  return (
    <nav className="flex justify-between items-center flex-row w-screen mb-16 py-3 backdrop-blur px-10 border-b-2">
      <div>
        <Link href="/" className="flex gap-2 flex-center">
          {/* <Image src='/images/logo.svg'
             alt="Logo"
             width={30}
             height={30}
             className='object-contain'/> */}
          <p className="max-sm:hidden font-satoshi font-semibold text-lg text-black tracking-wide">
            Connext
          </p>
        </Link>
      </div>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center">
              Create Post
            </button>

            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
            >
              SignOut
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <button
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
              onClick={() =>
                (window.location.href = "http://localhost:3000/api/auth/signin")
              }
            >
              Sign in
            </button>
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <img
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  my Profile
                </Link>
                <Link
                  href={"/addPost"}
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:3000/api/auth/signin")
              }
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

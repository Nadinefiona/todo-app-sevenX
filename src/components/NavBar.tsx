import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { ModeToggle } from './ThemeToggle';

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="flex justify-between p-4 dark:bg-black text-white">
      <div className="relative flex items-center"></div>

      <div className="relative flex space-x-2">
        <ModeToggle />
        <Image
          src={session?.user?.image || ''}
          alt="User Image"
          width={50}
          height={50}
          className="rounded-full cursor-pointer"
          onClick={toggleDropdown}
          aria-expanded={dropdownOpen}
        />
        {dropdownOpen && (
          <div className="absolute top-12 right-0 bg-white text-black rounded-md shadow-lg p-4">
            <div className="flex flex-col items-start">
              <div className="font-semibold pb-3">{session?.user?.name}</div>
              <div className="text-sm text-gray-600">
                {session?.user?.email}
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="block w-full mt-4 px-4 py-2 text-left bg-black hover:bg-gray-500 text-white rounded-sm"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

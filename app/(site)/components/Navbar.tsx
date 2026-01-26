"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [menuItems] = useState([
    { label: "Hjem", path: "/" },
    { label: "Om oss", path: "/om-oss" },
    { label: "Musikere", path: "/musikere" },
    { label: "Utgivelser", path: "/utgivelser" },
    { label: "Konserter", path: "/konserter" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <nav className="h-16 sm:h-20 p-2 sm:px-4 flex justify-end w-full">
        <div className="absolute left-2 top-2 sm:top-4 sm:left-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="size-13 sm:size-16 hover:scale-105 transition-transform"
            />
          </Link>
        </div>
        <ul
          className={`hidden md:flex w-max gap-8 m-4 text-lg hover:text-stone-500 dark:hover:text-stone-400
          } `}
        >
          {menuItems.map((item) => (
            <Link
              href={item.path}
              className={`hover:text-foreground`}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </ul>
        <div className="md:hidden w-full flex justify-end" onClick={openMenu}>
          <Menu size={50} strokeWidth={1} />
        </div>
        {isOpen && (
          <div className="fixed md:hidden top-0 left-0 w-screen h-screen bg-background z-50">
            {/* logo and cross */}
            <div className="h-20 sm:h-24 p-2 flex justify-between w-full">
              <div className="w-full flex justify-end">
                <X size={50} strokeWidth={1} onClick={closeMenu} />
              </div>
            </div>

            {/* menu on mobile */}
            <ul className="text-5xl grid gap-4 px-2 text-center">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.path} onClick={closeMenu}>
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

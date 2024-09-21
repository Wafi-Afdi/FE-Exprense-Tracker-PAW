import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full flex flex-col py-10 justify-center items-center bg-gray-900">
      <p className="text-gray-100 text-xl font-bold mb-2">
        Anggota Kelompok PAW
      </p>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://github.com/Wafi-Afdi"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wafi Afdi Alfaruqhi 22/503393/TK/55000
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Putri
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shafa
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ada
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Nanta
      </a>
    </footer>
  );
}

export default Footer;

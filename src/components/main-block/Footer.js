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
        href="https://github.com/AdindaPutri1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Adinda Putri Romadhon 22/505508/TK/55321
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://github.com/Shafaauray"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shafa Aura Yogadiasa 22/496508/TK/54406
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://github.com/Anantadhirya"
        target="_blank"
        rel="noopener noreferrer"
      >
        Daniel Anantadhirya Adyawisesa Linan 22/492989/TK/53975
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-100"
        href="https://github.com/AdakHaddad"
        target="_blank"
        rel="noopener noreferrer"
      >
        Muhammad Muqtada Alhaddad 22/500341/TK/54841

      </a>
    </footer>
  );
}

export default Footer;

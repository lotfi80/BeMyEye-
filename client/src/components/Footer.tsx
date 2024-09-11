import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full h-[30%] bg-white">
      {/* Footer-Inhalt hier */}

      <div className="container mx-auto text-center pt-10">
        <div className="flex justify-center p-2 text-zinc-500 pb-7">
          <Link className="mx-2" to="/">
            Impressum
          </Link>
          <Link className="mx-2" to="/">
            Contact
          </Link>
          <Link className="mx-2" to="/">
            Home
          </Link>
          <Link className="mx-2" to="/">
            Location
          </Link>
          <Link className="mx-2" to="/">
            Categorys
          </Link>
          <Link className="mx-2" to="/">
            User
          </Link>
          <Link className="mx-2" to="/">
            Service
          </Link>
        </div>
        <div className="flex justify-center space-x-6">
          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            className="text-[#3b5998] hover:text-[#3d86b0]"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.326v21.348C0 23.403.596 24 1.326 24h11.483v-9.294H9.691v-3.622h3.117V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.505 0-1.797.716-1.797 1.766v2.316h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.326-.597 1.326-1.326V1.326C24 .597 23.404 0 22.675 0z" />
            </svg>
          </a>

          {/* Github */}
          <a
            href="https://github.com"
            className="text-[#333] hover:text-white"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25C6.15 2.25 1.5 6.9 1.5 12.75c0 4.95 3.3 9.15 7.8 10.65.575.1.75-.25.75-.55v-1.95c-3.25.725-4.15-1.4-4.15-1.4-.575-1.4-1.4-1.75-1.4-1.75-1.1-.75.075-.75.075-.75 1.2.075 1.9 1.25 1.9 1.25 1.05 1.8 2.75 1.3 3.4 1.05.1-.8.4-1.3.725-1.6-2.6-.3-5.35-1.3-5.35-5.8 0-1.25.45-2.25 1.2-3.05-.125-.3-.525-1.5.1-3.2 0 0 1.1-.35 3.6 1.35a12.7 12.7 0 0 1 2.55-.275c.85 0 1.7.1 2.55.275 2.5-1.7 3.6-1.35 3.6-1.35.625 1.7.225 2.9.1 3.2.75.8 1.2 1.8 1.2 3.05 0 4.5-2.75 5.5-5.35 5.8.4.35.725 1.05.725 2.1v3.1c0 .3.175.65.75.55 4.5-1.5 7.8-5.7 7.8-10.65 0-5.85-4.65-10.5-10.5-10.5z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mb-4 bg-white text-zinc-400 justify-center bg-clip-padding text-center py-7">
        &copy; 2024 Be-My-Eyes. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;

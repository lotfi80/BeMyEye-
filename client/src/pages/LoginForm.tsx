
import React, { useState } from "react";
import { loginUser } from "../http/api";
import { useNavigate } from "react-router-dom";
import { useCategoryUserContext } from "../context/CategoryUser";
import logo from "../assets/logo2.png"

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { user, setUser } = useCategoryUserContext();

  const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const currentUser = await loginUser(email, password);
      setUser(currentUser);
      navigate(`/home`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-35 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Lokales Bild verwenden */}
        <img
          className="mx-auto w-500 h-500 md:w-900 lg:w-900"
          src={logo} // Verwende hier die importierte Bildvariable
          alt="Your Company"
        />
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmitClick} method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#38b5ff]  hover:text-[#469bcc]">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#38b5ff] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2781b5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Or sign in with</p>
          <a
            className="mt-3 inline-block w-full rounded-md bg-[#FCAF45] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            href={`http://localhost:5000/auth/google`}
          >
            Sign in with Google
          </a>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6  "
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
      );
    };
    

export default LoginForm;

































// import React, { useState } from "react";
// import { loginUser } from "../http/api";
// import { useNavigate } from "react-router-dom";
// import { useCategoryUserContext } from "../context/CategoryUser";

// const LoginForm = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const navigate = useNavigate();
//   const { user, setUser } = useCategoryUserContext();

//   const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const currentUser = await loginUser(email, password);
//       setUser(currentUser);
//       navigate(`/home`);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmitClick}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <a className="button google" href={`http://localhost:5000/auth/google`}>
//         Sign in with Google
//       </a>
//     </div>
//   );
// };

// export default LoginForm;

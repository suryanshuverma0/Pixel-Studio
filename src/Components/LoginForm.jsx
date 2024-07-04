import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginForm = () => {
  // States for the login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHidePassword, setShowHidePassword] = useState(false);

  // Routes to navigate
  const navigate = useNavigate();

  // Custom hooks
  const { signIn, signInWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Email:", email, "Password:", password);
      const user = await signIn(email, password);

      const auth = {
        userId: user.uid,
        email: user.email,
        isAuth: true,
      };
      console.log("info", auth);

      localStorage.setItem("authInfo", JSON.stringify(auth));
      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Account does not exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-800 to-black h-screen flex justify-center items-center">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-6 shadow-2xl rounded-2xl bg-[#161B22] text-white p-8 w-full">
              <div className="mt-8">
                <h1 className="text-4xl text-white font-bold text-center">
                  Login
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <div className="text-center mt-10">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="placeholder:text-slate-400 px-4 py-2 text-md w-full rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white transition-all duration-300 ease-in-out transform  shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type={showHidePassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    className="px-4 py-2 text-md w-full rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white transition-all duration-300 ease-in-out transform shadow-inner"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="show-hide"
                      onChange={() => {
                        setShowHidePassword(!showHidePassword);
                      }}
                      checked={showHidePassword}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor="show-hide"
                      className="text-white cursor-pointer"
                    >
                      {showHidePassword ? "Hide" : "Show"} Password
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full text-xl rounded-md px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-white">
                  Don&apos;t have an account?{" "}
                  <span
                    className="text-blue-400 hover:underline cursor-pointer"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </span>
                </p>
              </div>

              <span className="block text-center text-lg ">Or</span>
              <div>
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.07 0 5.63 1.11 7.52 2.94l5.58-5.57C33.68 3.48 29.22 1.5 24 1.5 14.84 1.5 7.13 7.58 4.1 16.09l6.96 5.47C12.39 16.41 17.73 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.5 24.62c0-1.44-.12-2.83-.34-4.17H24v8.39h12.62c-.55 2.95-2.17 5.44-4.53 7.11l6.96 5.47c4.06-3.75 6.45-9.28 6.45-15.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.94 28.19c-.56-1.63-.88-3.35-.88-5.19s.32-3.56.88-5.19l-6.96-5.47C2.8 16.91 1.5 20.37 1.5 24s1.3 7.09 3.48 10.66l6.96-5.47z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 46.5c5.22 0 9.68-1.75 12.91-4.74l-6.96-5.47c-1.95 1.3-4.41 2.08-7.05 2.08-6.28 0-11.61-6.91-11.88-15.39H4.1l-6.96 5.47C7.13 40.42 14.84 46.5 24 46.5z"
                    />
                  </svg>
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;

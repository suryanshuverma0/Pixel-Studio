import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterForm = () => {
  // States for the registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHidePassword, setShowHidePassword] = useState(false);

  // Routes to navigate
  const navigate = useNavigate();

  //Custom Hooks
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(
        "Email:",
        email,
        "Password:",
        password
      );
      await signUp(email, password);

      toast.success("Registeration Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(()=>{
      navigate("/login");
      },3000)
    } catch (error) {
      console.error("Error registering:", error.message);

      if (error.code === "auth/email-already-in-use") {
        toast.error("Account Already Exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Registration Failed. Please try again later.", {
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
                  Register
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="placeholder:text-slate-400 px-4 py-2 text-md w-full rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-inner"
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
                    className="px-4 py-2 text-md w-full rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-inner"
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
                    Register
                  </button>a
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-white">
                  Already have an account?{" "}
                  <span
                    className="text-blue-400 hover:underline cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;

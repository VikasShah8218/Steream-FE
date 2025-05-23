import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../../../app/slices/authSlice";
// import { BASE_URL } from "../../../globals/requests";
import { useRef } from "react";
import { postToServer } from "../../../globals/requests";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const submitLogin = async (e: any) => {
        e.preventDefault();
        if (!usernameRef.current || !passwordRef.current) {
          console.error("Username or password input is missing.");
          return;
        }
        const reqData = {
          username: usernameRef.current.value,
          password: passwordRef.current.value
        }
        if (!reqData) return false;
        console.log(reqData)
        const result = await postToServer("/login/", reqData);
        if (result.status===200 || result.status===201 ) {
            console.log(result.data);
            dispatch(login(result.data));
            navigate('/');
        }
        // dispatch(login({username:"Shah",token:"1234567890"}));
        // navigate('/home');
      };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    start your 14-day free trial
                </a>
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={submitLogin}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="username" className="sr-only">
                        Username
                    </label>
                    <input
                    ref={usernameRef}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                    Password
                    </label>
                    <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    />
                </div>
                </div>
        
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                    </label>
                </div>
        
                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                    </a>
                </div>
                </div>
        
                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </span>
                    Sign in
                </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SignIn;
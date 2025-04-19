import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4'>
      <h1 className='text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white'>
        Log In
      </h1>
      <Login />
    </div>
  );
};

export default LoginPage;

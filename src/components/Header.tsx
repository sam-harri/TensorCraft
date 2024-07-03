const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://logodownload.org/wp-content/uploads/2022/12/figma-logo-2.png"
          alt="Logo"
          className="h-10 w-auto ml-4"
        />
        <h1 className="ml-4 text-xl font-semibold text-gray-800">Drag n' Drop AI</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <button className="ml-4 px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-100">
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;

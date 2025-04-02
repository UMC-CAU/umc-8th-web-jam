const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75 -z-10"
        style={{ backgroundImage: `url('/wonder.png')` }}
      />
      <div className="flex justify-center items-center h-full">
        <h1 className="text-white text-6xl md:text-8xl font-extrabold drop-shadow-lg hover:scale-450 transition duration-1500 ease-out">
          JMDB
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
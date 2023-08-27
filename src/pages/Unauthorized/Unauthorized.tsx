const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Acceso denegado</h1>
          <p className="mt-2 text-lg text-gray-600">
            No tiene los permisos para acceder a esta sección
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

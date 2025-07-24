const Unauthorized = () => {
    return (
        <div className="text-center p-6">
            <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="mt-4 text-gray-600">You do not have permission to access this page.</p>
        </div>
    );
};

export default Unauthorized;

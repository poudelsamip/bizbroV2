import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="mb-4">
                    <h1 className="text-5xl font-bold text-blue-600 mb-2">
                        404
                    </h1>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        Page not found
                    </h2>
                    <p className="text-sm text-gray-500">
                        The page you are looking for doesn’t exist or was moved.
                    </p>
                </div>

                <div className="flex justify-center gap-3 mt-6">
                    <Link
                        to="/"
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

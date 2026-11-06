interface LoaderProps {
    message?: string
}

const Loader = ({ message = "Loading Countries..." }: LoaderProps) => {
  return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">

            {/* Spinner */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            {/* Loading Message */}
            <p className="text-sm font-medium text-gray-600">
                {message}
            </p>

        </div>
    );
}

export default Loader
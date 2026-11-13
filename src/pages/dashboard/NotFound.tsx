import { Link } from 'react-router-dom'

const NotFound = () => {
return (
<section className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
<div className="max-w-lg text-center">
<h1 className="bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 bg-clip-text text-9xl font-extrabold tracking-tight text-transparent">
404
</h1>

    <h2 className="mt-4 text-3xl font-bold text-slate-800">
      Page Not Found
    </h2>

    <p className="mt-4 text-base leading-7 text-slate-500">
      Oops! The page you're looking for might have been removed,
      renamed, or is temporarily unavailable.
    </p>

    <Link
      to="/"
      className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 cursor-pointer"
    >
      Back to Dashboard
    </Link>
  </div>
</section>

)
}

export default NotFound
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-semibold">Page not found</h2>
      <p className="mt-3 text-white/70">
        The page you are looking for does not exist.
      </p>
      <Link className="mt-6 inline-block text-lg underline underline-offset-4" to="/">
        Go home
      </Link>
    </section>
  )
}

export default NotFound

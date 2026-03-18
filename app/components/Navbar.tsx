import { auth, signIn, signOut } from "../../auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-600">CareerAI</div>
      <div className="flex items-center gap-6">
        <a href="/" className="text-slate-600 hover:text-blue-600 font-medium">Home</a>
        <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium">About</a>
        
        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image ? (
              <img src={session.user.image} className="w-8 h-8 rounded-full border" alt="profile" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                {session.user?.name?.charAt(0)}
              </div>
            )}
            <form action={async () => { "use server"; await signOut(); }}>
              <button className="text-sm text-red-500 font-medium">Logout</button>
            </form>
          </div>
        ) : (
          <form action={async () => { "use server"; await signIn("google"); }}>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">
              Login
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
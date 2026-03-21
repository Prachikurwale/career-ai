import { auth } from "@/auth";
import DreamRouteLogo from "./DreamRouteLogo";
import NavbarClientControls from "./NavbarClientControls";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/88 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88">
      <div className="  flex   items-center justify-between px-5 py-4 md:px-8">
        <DreamRouteLogo />
        <NavbarClientControls isLoggedIn={Boolean(session)} />
      </div>
    </nav>
  );
}

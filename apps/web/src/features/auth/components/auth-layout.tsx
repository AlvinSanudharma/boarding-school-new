import { ArrowLeft, GraduationCap, HelpCircle } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-foreground lg:flex-row">
      {/* Mobile/Tablet Top Navbar (Hidden on Desktop split view) */}
      <nav className="fixed top-0 z-50 flex h-[76px] w-full items-center justify-between border-border border-b bg-white px-5 lg:hidden">
        <a
          href="#"
          className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border transition-colors hover:bg-muted"
          title="Back"
        >
          <ArrowLeft className="size-6 text-foreground" />
        </a>
        <h1 className="font-bold text-lg">Admin Login</h1>
        <div
          className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border transition-colors hover:bg-muted"
          title="Help"
        >
          <HelpCircle className="size-6 text-secondary" />
        </div>
      </nav>

      {/* Left Side: Visual Branding (Desktop Only) */}
      <div className="relative hidden w-1/2 overflow-hidden bg-foreground lg:flex">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=1600&fit=crop"
          alt="University Campus"
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-12 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="size-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">
              EduManage Pro
            </span>
          </div>

          <div className="max-w-md">
            <h2 className="mb-4 font-bold text-4xl text-white leading-tight">
              Empowering educational excellence.
            </h2>
            <p className="mb-8 text-lg text-secondary text-white/70">
              Access powerful tools to manage students, track progress, and
              streamline administrative workflows.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                  className="size-10 rounded-full border-2 border-foreground object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
                  className="size-10 rounded-full border-2 border-foreground object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  className="size-10 rounded-full border-2 border-foreground object-cover"
                />
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-foreground bg-white font-bold text-primary text-xs">
                  +2k
                </div>
              </div>
              <span className="font-medium text-sm text-white/80">
                Trusted by institutions worldwide
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Area */}
      <main className="relative flex flex-1 flex-col justify-center bg-white px-5 py-4 pt-[76px] sm:px-10 md:px-16 lg:px-24 lg:pt-0 xl:px-32">
        <div className="mx-auto flex w-full max-w-[420px] flex-col">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-12 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="size-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">EduManage</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="mb-2 font-bold text-3xl">Welcome Back</h2>
            <p className="text-secondary">
              Please enter your details to access your account.
            </p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

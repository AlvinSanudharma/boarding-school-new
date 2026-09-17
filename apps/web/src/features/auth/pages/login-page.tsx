import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  HelpCircle,
  Info,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export default function LoginPage() {
  const [currentRole, setCurrentRole] = useState<"student" | "admin">("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const filterByTab = (type: string, value: "student" | "admin") => {
    if (type !== "role") return;
    setCurrentRole(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("inputEmail") as HTMLInputElement
    ).value.trim();
    const password = (
      form.elements.namedItem("inputPassword") as HTMLInputElement
    ).value.trim();

    if (!email || !password) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      showToast(
        `Successfully logged in as ${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}!`,
        "success",
      );
      setIsLoading(false);
      form.reset();
    }, 1500);
  };

  const showToast = (msg: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const getEmailLabel = () =>
    currentRole === "admin" ? "Admin Email" : "Student ID or Email";
  const getEmailPlaceholder = () =>
    currentRole === "admin"
      ? "admin@institution.edu"
      : "student.id@institution.edu";
  const getSubmitText = () =>
    currentRole === "admin" ? "Sign In as Admin" : "Sign In as Student";

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="size-5" />;
      case "error":
        return <AlertCircle className="size-5" />;
      default:
        return <Info className="size-5" />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-foreground lg:flex-row">
      {/* Toast Container */}
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`fixed top-24 left-1/2 -translate-x-1/2 transform lg:top-8 ${
            toast.type === "success"
              ? "bg-success"
              : toast.type === "error"
                ? "bg-error"
                : "bg-foreground"
          } z-[100] flex items-center gap-3 rounded-2xl px-5 py-3.5 font-medium text-white shadow-2xl transition-all duration-300`}
        >
          {getToastIcon(toast.type)}
          <span>{toast.message}</span>
        </div>
      ))}

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

          {/* Role Tabs */}
          <div className="scrollbar-hide mb-8 overflow-x-auto border-border border-b">
            <nav className="flex min-w-max">
              <button
                data-filter-type="role"
                data-filter-value="student"
                onClick={() => filterByTab("role", "student")}
                className={`tab-btn flex-1 cursor-pointer whitespace-nowrap border-b-2 px-6 py-3 font-medium transition-all ${
                  currentRole === "student"
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent font-medium text-secondary hover:text-foreground"
                }`}
              >
                Student Login
              </button>
              <button
                data-filter-type="role"
                data-filter-value="admin"
                onClick={() => filterByTab("role", "admin")}
                className={`tab-btn flex-1 cursor-pointer whitespace-nowrap border-b-2 px-6 py-3 transition-all ${
                  currentRole === "admin"
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent font-medium text-secondary hover:text-foreground"
                }`}
              >
                Admin Login
              </button>
            </nav>
          </div>

          {/* Login Form */}
          <form
            id="loginForm"
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="inputEmail"
                className="font-semibold text-foreground text-sm"
              >
                {getEmailLabel()}
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="size-5 text-secondary" />
                </div>
                <input
                  type="email"
                  id="inputEmail"
                  name="inputEmail"
                  className="w-full rounded-xl border border-border bg-white py-3.5 pr-4 pl-11 font-medium outline-none transition-all placeholder:text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder={getEmailPlaceholder()}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="inputPassword"
                className="font-semibold text-foreground text-sm"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="size-5 text-secondary" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="inputPassword"
                  name="inputPassword"
                  className="w-full rounded-xl border border-border bg-white py-3.5 pr-12 pl-11 font-medium outline-none transition-all placeholder:text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-secondary transition-colors hover:text-foreground"
                  title="Toggle Password Visibility"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Form Options */}
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inputRemember"
                  className="custom-checkbox"
                />
                <label
                  htmlFor="inputRemember"
                  className="cursor-pointer select-none font-medium text-secondary text-sm"
                >
                  Remember for 30 days
                </label>
              </div>
              <a
                href="#"
                className="font-semibold text-primary text-sm transition-colors hover:text-primary-hover"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white transition-colors hover:bg-primary-hover ${
                isLoading ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>{getSubmitText()}</span>
                  <ArrowRight className="size-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-secondary text-sm">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Contact IT Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

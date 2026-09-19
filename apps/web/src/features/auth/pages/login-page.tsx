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
import AuthLayout from "../components/auth-layout";

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
    <>
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
    </>
  );
}

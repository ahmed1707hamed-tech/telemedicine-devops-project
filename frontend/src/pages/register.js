import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Stethoscope, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";
import { registerUser } from "../services/api";
import { motion } from "framer-motion";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 2 & 4: Sending correct payload keys as expected by FastAPI
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      // Step 6: Debugging logs
      console.log("Register payload:", payload);

      await registerUser(payload);

      toast.success("Registration successful!");
      alert("Registration successful");
      router.push("/");

    } catch (error) {
      // Step 2: Logging backend errors
      console.log("Backend error:", error.response?.data);
      
      let errorData = error.response?.data;
      alert(JSON.stringify(errorData || "Network Error"));
      
      let errorMsg = "Registration failed";
      if (errorData?.detail) {
        errorMsg = Array.isArray(errorData.detail) ? errorData.detail[0]?.msg : errorData.detail;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>

      <Head>
        <title>Registry | TeleMed Logistics</title>
      </Head>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2rem] text-white shadow-2xl shadow-blue-500/20 mb-8"
          >
            <Stethoscope size={40} />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-tight">System Registry</h1>
          <p className="text-slate-500 mt-3 font-medium">Create your administrative credentials.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 4: Inputs with name attributes */}
            <FormInput
              label="Full Name"
              id="name"
              placeholder="e.g. AHMED HAMED"
              value={formData.name}
              onChange={handleChange}
            />

            <FormInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="admin@telemed.io"
              value={formData.email}
              onChange={handleChange}
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-white font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 mt-6 shadow-xl ${
                loading
                  ? "bg-slate-800 cursor-not-allowed opacity-50"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  INITIALIZE ACCESS
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-10 font-medium">
            Authorized personnel only?
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500 font-bold ml-1 hover:underline focus:outline-none"
            >
              Log in
            </button>
          </p>
        </motion.div>

        <p className="text-center text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase mt-12 opacity-50">
          © 2026 TeleMed Central Intelligence
        </p>
      </div>
    </div>
  );
}

Register.isAuthPage = true;
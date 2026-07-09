import { LuCircleCheck } from "react-icons/lu";
import { useNavigate } from "react-router";

export default function Modal() {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
            <div className="relative z-[80] w-full max-w-md rounded-2xl bg-white py-20 text-center shadow-2xl">
                <div className="mb-4 flex justify-center">
                    <LuCircleCheck size={60} color="green" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                    Account created successfully
                </h3>
                <p className="mt-3 text-lg tracking-tight text-slate-600">
                    Sign in below to access your dashboard.
                </p>
                <button
                    type="button"
                    className="mt-6 rounded-full bg-gradient-to-r from-[#095ae6] to-[#062794] px-20 py-3 font-semibold text-white shadow-md hover:cursor-pointer"
                    onClick={() => navigate("/sign-in")}
                >
                    Continue to Sign In
                </button>
            </div>
        </div>
    )
}

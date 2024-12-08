"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button className="flex justify-center items-center bg-accent-500 w-52 h-16 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? (
        <>
          <SpinnerMini />
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}

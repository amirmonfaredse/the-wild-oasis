import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800 px-10 rounded-md">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <Link href="/login" className="text-accent-500">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;

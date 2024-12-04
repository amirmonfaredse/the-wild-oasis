import Image from "next/image";
import { auth } from "../_lib/auth";
import Link from "next/link";

export default async function GuestsAreaNavigation() {
  const session = await auth();
  return (
    <div>
      {session?.user?.image ? (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex items-center gap-4"
        >
          <span>Guests Area</span>
          <div className="h-8 w-8 relative">
            <Image
              fill
              className="rounded-full object-cover"
              src={session.user.image}
              alt={`${session.user.name} profile`}
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>
      ) : (
        <Link
          href="/account"
          className="hover:text-accent-400 transition-colors"
        >
          Guests Area
        </Link>
      )}
    </div>
  );
}

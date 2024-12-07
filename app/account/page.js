import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};
export default async function Page() {
  const session = await auth();
  console.log(session);
  
  const firstName = session.user.name.split(' ').at(0)
  return (
    <div>
      <h1 className="px-8 py-6 text-accent-400 text-lg font-semibold ">
        Hello , Welcome {firstName} !
      </h1>
    </div>
  );
}

import { options } from "@/app/api/auth/[...nextauth]/options";
import { SearchBar } from "@/components/searchBar";
import { getServerSession } from "next-auth";
import { User } from "./header/user";
import { AllRooms } from "./rooms/all-rooms";
import { CreateRoom } from "./rooms/create-room";
import { Logo } from "@/components/logo";
import { Header } from "@/components/header";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <main className=" min-h-screen  p-7">
      {session && session.user?.name && (
        <>
          <Header user={session.user} />

          {session?.backendTokens?.jwt && (
            <AllRooms
              jwt={session.backendTokens.jwt}
              userId={session.user.id}
            />
          )}

          <div className="fixed bottom-[40px] left-1/2 transform -translate-x-1/2">
            <CreateRoom jwt={`${session?.backendTokens?.jwt}`} />
          </div>
        </>
      )}
    </main>
  );
}

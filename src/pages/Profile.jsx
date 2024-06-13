import { AccountInfo } from "@/components/ProfileComp/AccountInfo";
import { NavBar } from "@/components/NavBar";
import { ProfileList } from "@/data";
import { Each } from "@/utils/Each";
import { Show } from "@/utils/Show";

import { Link, useLocation } from "react-router-dom";   

export const Profile = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <NavBar></NavBar>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Profile</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
              {
                <Each
                  of={ProfileList}
                  render={(item) => (
                    <Link to={item.url} className={`font-semibold hover:text-primary transition-all ${location.pathname === item.url ? "font-semibold text-primary" : ""}`}>
                      {item.text}
                    </Link>
                  )}
                ></Each>
              }
            </nav>
            <Show>
              <Show.When isTrue={location.pathname === "/profile"} children={<AccountInfo></AccountInfo>}></Show.When>
            </Show>
          </div>
        </main>
      </div>
    </div>
  );
};

import { Package2, PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Each } from "@/utils/Each";
import { useStore } from "@/context/storeContext";
import { ModeToggle } from "./mode-toggle";
import { List } from "@/data";

export const NavBar = () => {
  const location = useLocation();
  const { state } = useStore();

  useEffect(() => {
    console.log(state);
    setActive(location.pathname);
  }, [location]);
  const [active, setActive] = useState(location.pathname);

  return (
    <header className="sticky top-0 z-30 flex justify-end h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Each
              of={List}
              render={(item) => (
                <Link to={item.url} className={` ${active === item.url ? "flex items-center gap-4 px-2.5 text-foreground" : " flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground transition-all"} `}>
                  <item.icon className="h-5 w-5" />
                  {item.text}
                </Link>
              )}
            ></Each>
          </nav>
        </SheetContent>
      </Sheet>
      <ModeToggle className="ml-auto"></ModeToggle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <img src={state.photo} width={36} height={36} alt="Avatar" className="overflow-hidden rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          {/* <Link to={"/profile"}>
            <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem>
          </Link> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

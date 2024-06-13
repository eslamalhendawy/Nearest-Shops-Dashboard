import * as React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { Each } from "@/utils/Each";
import { List } from "@/data";

export const Sidebar = () => {
  const location = useLocation();
  React.useEffect(() => {
    setActive(location.pathname);
  }, [location]);
  const [active, setActive] = React.useState(location.pathname);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Each
          of={List}
          render={(item) => {
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.url} className={`${active === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground"} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 md:text-base`}>
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.text}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.text}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }}
        ></Each>
      </nav>
    </aside>
  );
};

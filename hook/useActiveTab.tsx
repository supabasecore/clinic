import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useActiveTab(
  pathname: string,
  tabname: string
): [string, (tab: string) => void] {
  const routerPathname = usePathname();
  const params = useSearchParams();

  const [activeTab, setActiveTab] = useState(() => {
    if (params.get("tab")) {
      return params.get("tab") as string;
    } else if (routerPathname === pathname) {
      return tabname;
    }
    return "";
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return [activeTab, handleTabChange];
}

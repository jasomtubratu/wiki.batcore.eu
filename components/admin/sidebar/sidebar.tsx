"use client"
import React, { useEffect, useState } from "react";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { IconArticle, IconArticleFilled, IconShieldCheckered } from "@tabler/icons-react";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [administrator, setAdministrator] = useState(false);

  useEffect(() => {
    async function checkIfAdmin() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("googlesesionid")}`

          },
        });
    
        if (response.ok) {
          const jsonresponse = await response.json()
          setAdministrator(jsonresponse)
        }
      } catch (error) {
        console.error("Error occurred while fetching status data: ", error);
      }
    }

    checkIfAdmin();
  }, []);

  return (
    <aside className="h-screen z-[202] sticky top-0">
      
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
        <div className="flex items-center gap-2">
          <Image src="/favicon.ico" alt="logo" height={32} width={32}></Image>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              <Link href="/">BatCore.eu</Link>
            </h3>
            <span className="text-xs font-medium text-default-500">
              {process.env.NEXT_PUBLIC_WEB_VERSION}
            </span>
          </div>
        </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Domov"
              icon={<HomeIcon />}
              isActive={pathname === "/admin"}
              href="/admin"
            />
            <SidebarMenu title="Články">
              <SidebarItem
                isActive={pathname === "/admin/articles"}
                title="Tvoje Články"
                href="/admin/articles"
                icon={<IconArticle color="gray" />}
              />
            </SidebarMenu>

            <SidebarMenu title="Účet">
            <SidebarItem
                isActive={pathname === "/admin/profile"}
                title="Tvôj účet"
                icon={<AccountsIcon />}
                href="/admin/profile"
              />
              <SidebarItem
                isActive={pathname === "/admin/profile/security"}
                title="Zabezpečenie účtu"
                icon={<IconShieldCheckered color="gray" />}
                href="/admin/profile/security"
              />
            </SidebarMenu>

            {administrator && ( 
              <SidebarMenu title="Administration">
                <SidebarItem
                  isActive={pathname === "/admin/administrator/users"}
                  title="Všetky účty"
                  icon={<AccountsIcon />}
                  href="/admin/administrator/users"
                />
                <SidebarItem
                  isActive={pathname === "/admin/administrator/articles"}
                  title="Všetky články"
                  icon={<IconArticleFilled color="gray" />}
                  href="/admin/administrator/articles"
                />
              </SidebarMenu>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

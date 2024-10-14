"use client"
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { IconArticle, IconArticleFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import { useSidebarContext } from "../layout/layout-context";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";

import { SidebarMenu } from "./sidebar-menu";
import { SidebarItem } from "./sidebar-item";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [administrator, setAdministrator] = useState(false);
  const session = useSession();

  useEffect(() => {
  if (session.data?.user?.role === "ADMIN") {
    setAdministrator(true);
  }
  }, [session]);

  return (
    <aside className="h-screen z-[202] sticky top-0">
      
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
        <div className="flex items-center gap-2">
          <Image alt="logo" height={32} src="/favicon.ico" width={32} />
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
              href="/admin"
              icon={<HomeIcon />}
              isActive={pathname === "/admin"}
              title="Domov"
            />
            <SidebarMenu title="Články">
              <SidebarItem
                href="/admin/articles"
                icon={<IconArticle color="gray" />}
                isActive={pathname === "/admin/articles"}
                title="Tvoje Články"
              />
            </SidebarMenu>

            <SidebarMenu title="Účet">
            <SidebarItem
                href="/admin/profile"
                icon={<AccountsIcon />}
                isActive={pathname === "/admin/profile"}
                title="Tvôj účet"
              />
            </SidebarMenu>

            {administrator && ( 
              <SidebarMenu title="Administration">
                <SidebarItem
                  href="/admin/administrator/users"
                  icon={<AccountsIcon />}
                  isActive={pathname === "/admin/administrator/users"}
                  title="Všetky účty"
                />
                <SidebarItem
                  href="/admin/administrator/articles"
                  icon={<IconArticleFilled color="gray" />}
                  isActive={pathname === "/admin/administrator/articles"}
                  title="Všetky články"
                />
              </SidebarMenu>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

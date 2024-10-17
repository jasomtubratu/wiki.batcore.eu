"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  NavbarItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IconLogout,  IconSettings } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

import { useRouterWithLoader } from "@/components/useRouterNprogress";

export const UserDropdown = () => {
  const [avatar, setAvatar] = useState("");
  const router = useRouterWithLoader();
  const { data: session } = useSession();

  useEffect(() => {
    downloadAvatar();
  }, []);

  async function downloadAvatar() {
    try {
      const response = await fetch("/api/admin/user/avatar", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const jsonresponse = await response.json()

        setAvatar(jsonresponse.avatar)
      }
    } catch (error) {
      console.error("Error occurred! ", error);
    }
  }

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            size="md"
            src={avatar}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownSection showDivider title={"Informácie"}>
          <DropdownItem
            key="profile"
            className="flex flex-col justify-start w-full items-start"
          >
            <p>Si prihlásený ako: <strong>{session?.user.name}</strong></p>
            <p>Email: {session?.user.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection  title="Účet">
          <DropdownItem key="settings" description="Poďme si opraviť profil!" href="/admin/profile" startContent={<IconSettings />}>
            <Link color="foreground">
              Nastavenia
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" description="Odhlásiť sa" startContent={<IconLogout />} onClick={() => router.push("/logout", undefined)}>
            <Link color="danger" onClick={() => router.push("/logout", undefined)}>
              Odhlásiť sa
            </Link>
          </DropdownItem>
        </DropdownSection>

      </DropdownMenu>


    </Dropdown>
  );
};

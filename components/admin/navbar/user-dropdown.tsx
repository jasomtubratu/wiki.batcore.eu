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
import { IconLogout,  IconSettings, IconShield } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const UserDropdown = () => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("Loading...");
  const [email, setEmail] = useState("info@batcore.eu");
  const router = useRouter();

  useEffect(() => {
    downloadUser();
  }, []);

  async function downloadUser() {
    try {
      const response = await fetch("/api/admin/userInformation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${Cookies.get("sessionKey")}`,

        },
      });

      if (response.ok) {
        const jsonresponse = await response.json()

        setEmail(jsonresponse.email)
        setAvatar(jsonresponse.avatar)
        setUsername(jsonresponse.username)
      }
    } catch (error) {
      console.error("Error occurred! ", error);
    }
  }

  function LogOut() {
    Cookies.remove("googlesesionid");
    router.push("/");
    toast.success("Úspešne si sa odhlásil!");
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
        <DropdownSection showDivider title={"Information"}>
          <DropdownItem
            key="profile"
            className="flex flex-col justify-start w-full items-start"
          >
            <p>Si prihlásený ako: <strong>{username}</strong></p>
            <p>Email: {email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider title="Account Settings">
          <DropdownItem key="settings" description="Poďme si opraviť profil!" href="/admin/profile" startContent={<IconSettings />}>
            <Link color="foreground">
              Nastavenia
            </Link>
          </DropdownItem>
          <DropdownItem key="security" description="Je tvoja história zabezpečená?" href="/admin/profile/security" startContent={<IconShield />}>
            <Link color="foreground" onClick={() => router.push("/admin/profile/security")}>
              Zabezpečenie
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" description="Odhlásiť sa" startContent={<IconLogout />} onClick={() => LogOut()}>
            <Link color="danger" onClick={() => LogOut()}>
              Odhlásiť sa
            </Link>
          </DropdownItem>
        </DropdownSection>

      </DropdownMenu>


    </Dropdown>
  );
};

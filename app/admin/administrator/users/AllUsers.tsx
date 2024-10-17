/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useState } from "react";
import {
  Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider,
  Input,
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure,
  User
} from "@nextui-org/react";
import { toast } from "react-toastify";

import { useRouterWithLoader } from "../../../../components/useRouterNprogress";

import { DeleteIcon } from "@/components/admin/icons/nextui/DeleteIcon";
import { EditIcon } from "@/components/admin/icons/nextui/EditIcon";

interface UserData {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
}

const DeleteUserModal = ({
    isOpen, onClose, email, onDelete
  }: {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onDelete: () => void;
  }) => (
    <Modal
      backdrop="opaque"
      classNames={{ backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20" }}
      isOpen={isOpen}
      onOpenChange={onClose}
    >
      <ModalContent>
        <ModalHeader>Vymazať toto konto?</ModalHeader>
        <ModalBody>
          <p>Naozaj chcete vymazať toto konto? Táto akcia je nezvratná. Konto bude vymazané. Je to v poriadku?</p>
          <Divider />
          <p>Email: <strong>{email}</strong></p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>Zrušiť</Button>
          <Button color="success" onClick={onDelete}>Vymazať</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );


export default function AllUsersMiddle({
    userData,
}: {
  userData: UserData[];
}) {
    const router = useRouterWithLoader();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [vymazatEmail, setVymazatEmail] = useState<string>("");
    const [createUser, setCreateUser] = useState({ email: "", username: "", password: "" });
    
    const collums = [
        { name: "Meno", uid: "name" },
        { name: "Email", uid: "email" },
        { name: "Rola", uid: "role" },
        { name: "Akcie", uid: "actions" },
    ]

    const vymazatID = userData.find((user) => user.email === vymazatEmail)?.id;

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCreateUser((prev) => ({ ...prev, [name]: value }));
      }, []);

      const vytvoritUser = useCallback(async () => {
        toast("Vytváram uživateľa...");
        const { email, username, password } = createUser;

        if (!email || !username || !password) {
          toast.error("Všetky polia musia byť vyplnené");

          return;
        }
        if (password.length < 6) {
          toast.error("Heslo musí mať minimálne 6 znakov");

          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          toast.error("Email musí byť platný");

          return;
        }
        try {
          const response = await fetch(`/api/admin/administrator/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(createUser),
          });
          const data = await response.json();

          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Užívateľ bol vytvorený");
            router.refresh();
          }
        } catch (error) {
          toast.error("Nastala chyba pri vytváraní užívateľa");
        }
      }, [createUser]);

      const deleteUser = useCallback(async () => {
        toast("Vymazávam užívateľa...");
        try {
            const response = await fetch(`/api/admin/administrator/user/` + vymazatID, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();

          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Užívateľ bol vymazaný");
            onOpenChange();
            router.refresh();
          }
        } catch (error) {
          toast.error("Nastala chyba pri vymazávaní užívateľa");
        }
      }, [vymazatEmail, onOpenChange]);
    
      const deleteUserModal = useCallback((email: string) => {
        setVymazatEmail(email);
        onOpen();
      }, [onOpen]);
      
      const renderCell = useCallback((user: UserData, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof UserData];

        switch (columnKey) {
          case "username":
            return (
              <User
                avatarProps={{ src: user.avatar || "" }}
                description={user.email}
                name={cellValue}
              >
                {user.email}
              </User>
            );
          case "role":
            return (
              <Chip color={user.role === "ADMIN" ? "danger" : "primary"}>{user.role === "ADMIN" ? "Admin" : "Editor"}</Chip>
            );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon onClick={() => router.push(`/admin/administrator/users/edit/${user.id}`, undefined)} />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon onClick={() => deleteUserModal(user.email)} />
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      }, [deleteUserModal, router]);
    
      return (
        <>
          <div className="container mx-auto px-4 md:w-1/2 mt-5">
            <Card>
              <CardHeader>Vytvorenie editora</CardHeader>
              <CardBody className="gap-4 flex flex-col">
                <Input
                  isRequired
                  label="Email"
                  name="email"
                  placeholder="Zadajte email"
                  value={createUser.email}
                  onChange={handleInputChange}
                />
                <Input
                  isRequired
                  label="Meno"
                  name="username"
                  placeholder="Zadajte meno"
                  value={createUser.username}
                  onChange={handleInputChange}
                />
                <Input
                  isRequired
                  label="Heslo"
                  name="password"
                  placeholder="Zadajte heslo"
                  type="password"
                  value={createUser.password}
                  onChange={handleInputChange}
                />
              </CardBody>
              <CardFooter>
                <Button fullWidth color="primary" variant="shadow" onClick={vytvoritUser}>
                  Uložiť
                </Button>
              </CardFooter>
            </Card>
          </div>
    
          <Divider className="mt-5" />
    
          <div className="container mx-auto px-4 md:w-1/2 mt-5">
            <Table aria-label="Všetci užívatelia">
              <TableHeader columns={collums}>
                {(column) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={userData}>
                {(item: UserData) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
    
          <DeleteUserModal
            email={vymazatEmail}
            isOpen={isOpen}
            onClose={onOpenChange}
            onDelete={deleteUser}
          />
        </>
      );
    }
    
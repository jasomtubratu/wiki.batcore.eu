import { Table } from "@nextui-org/react";

interface UserData {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
}

export default function AllUsersMiddle({
    userData,
}: {
  userData: UserData[];
}) {
    return (
        <>
        test
        </>
    )
}
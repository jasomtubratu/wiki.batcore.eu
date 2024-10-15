"use client";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";

interface userData {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
}

export default function MyInformation({
    userData,
  }: {
    userData: userData;
  }) {
    const [postImage, setPostImage] = useState<{ File: any }>({ File: "" });
    const [userName, setUserName] = useState(userData.name);
    const [passwordsData, setPasswordsData] = useState<{ oldPassword: string, newPassword: string, newPassword2: string }>({ oldPassword: "", newPassword: "", newPassword2: "" });

    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e: any) => {
        const file = e;
        const base64 = await convertToBase64(file);

        setPostImage({ ...postImage, File: base64 });
    };

    async function editmyuser() {
        toast("Upravujem tvoje nastavenia");

        if (!userName && !postImage.File) {
            toast.error("Prosím zadaj platný username a avatar!");

            return;
        }

        try {
            const response = await fetch("/api/admin/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username: userName, avatar: postImage })
            });

            if (response.ok) {
                toast.success("Tvoje údaje sme úspešne zmenili");
                window.location.reload();
            } else {
                if (response.status === 600) {
                    toast.error("Toto meno už niekto používa!");
                } else if (response.status === 400) {
                    toast.error("Bad request!");
                } else {
                    toast.error("Niečo nám tu nesedí!");
                }
            }
        } catch (error) {
            toast.error("Nastala neznáma chyba!");
        }
    }

    const handleChangePassword = async () => {
        if (!passwordsData.oldPassword || !passwordsData.newPassword || !passwordsData.newPassword2) {
            toast.error("Prosím vyplň všetky polia!");

            return;
        }
        if (passwordsData.newPassword !== passwordsData.newPassword2) {
            toast.error("Nové heslá sa nezhodujú!");

            return;
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

        if (!passwordRegex.test(passwordsData.newPassword)) {
            toast.error("Heslo musí obsahovať aspoň 6 znakov, 1 veľké a malé písmeno, 1 špeciálny charakter a 1 číslo!");

            return;
        }

        try {
            const response = await fetch("/api/admin/user/password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ oldPassword: passwordsData.oldPassword, newPassword: passwordsData.newPassword })
            });

            if (response.ok) {
                toast.success("Tvoje heslo bolo úspešne zmenené");
                window.location.reload();
            } else {
                if (response.status === 400) {
                    toast.error("Zlé heslo!");
                } else {
                    toast.error("Niečo nám tu nesedí!");
                }
            }
        } catch (error) {
            toast.error("Nastala neznáma chyba!");
        }
        

    }

    return (
        <>
            <h1 className="text-4xl mb-4 text-center mt-5">Tvôj účet</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mr-5 ml-5">
                <div className='gap-4 flex flex-col'>
                        <Card>
                            <CardHeader className="flex gap-3">
                                <Avatar
                                    alt="nextui logo"
                                    radius="sm"
                                    src={userData.avatar || ""}
                                />
                                <div className="flex flex-col">
                                    <p className="text-md">{userName}</p>
                                    <p className="text-small text-default-500">{userData.email}</p>
                                </div>
                                
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                Zmena hesla
                            </CardHeader>
                            <CardBody className='flex flex-col gap-4'>
                            <Input
                                label="Staré heslo"
                                placeholder="Zadaj staré heslo"
                                type="password"
                                value={passwordsData.oldPassword}
                                onChange={(e) => setPasswordsData({ ...passwordsData, oldPassword: e.target.value })}
                            />
                            <Input
                                label="Nové heslo"
                                placeholder="Zadaj nové heslo"
                                type="password"
                                value={passwordsData.newPassword}
                                onChange={(e) => setPasswordsData({ ...passwordsData, newPassword: e.target.value })}
                            />
                            <Input
                                label="Zopakuj nové heslo"
                                placeholder="Zopakuj nové heslo"
                                type="password"
                                value={passwordsData.newPassword2}
                                onChange={(e) => setPasswordsData({ ...passwordsData, newPassword2: e.target.value })}
                            />
                            </CardBody>
                            <CardFooter>
                                <Button color='primary' variant='shadow' onClick={() => handleChangePassword()}>
                                    Zmeniť heslo
                                </Button>
                            </CardFooter>
                        </Card>
                </div>

                <div>
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg">Zmeniť tvoje údaje</h3>
                            </CardHeader>

                            <Divider />

                            <CardBody>
                                <div className="">
                                    <Input label="Tvoje meno" placeholder="Nastav si tvoje meno" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>

                                <div className="flex flex-row space-x-4 items-center mt-5">
                                    <Avatar
                                        alt="nextui logo"
                                        radius="sm"
                                        src={postImage.File}
                                    />
                                    <input accept="image/*" placeholder="Upload" type="file" onChange={(e) => handleFileUpload(e.target.files && e.target.files[0])} />
                                </div>
                            </CardBody>

                            <Divider />
                            <CardFooter>
                                <Button fullWidth color="primary" variant="shadow" onClick={editmyuser}>Zmeniť údaje</Button>
                            </CardFooter>

                        </Card>
                </div>
            </div>
        </>
    );
}
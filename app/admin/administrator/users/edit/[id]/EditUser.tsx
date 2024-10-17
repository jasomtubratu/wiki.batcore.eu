"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";

interface Articles {
  id: string;
  title: string;
}

interface userData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  articles: Articles[];
}
export default function Edituser({ userData }: { userData: userData }) {
  const [postImage, setPostImage] = useState<{ File: any }>({ File: "" });
  const [UserChange, setUserChange] = useState("");
  const [PasswordChange, setPasswordChange] = useState("");

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
    toast("Práve upravujem informácie o používateľovi.");

    try {
      const response = await fetch("/api/admin/administrator/user/" + userData.id,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: UserChange,
            image: postImage,
            password: PasswordChange,
          }),
        }
      );

      if (response.ok) {
        toast.success("Nastavenia uživateľa boli upravené!");
      } else {
        toast.error(
          "Niekde nastala chyba pri upravovaní informácií o používateľovi!"
        );
      }
    } catch (error) {
      toast.error("Niečo sa pokazilo");
    }
  }

  return (
    <>
      <h1 className="text-4xl mb-4 text-center mt-5">Upraviť informácie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mr-5 ml-5">
        <div>
          <Card>
            <CardHeader className="flex gap-3">
              <Avatar alt="logo" radius="sm" src={userData.avatar} />
              <div className="flex flex-col">
                <p className="text-md">{userData.name}</p>
                <p className="text-small text-default-500">{userData.email}</p>
              </div>
            </CardHeader>
          </Card>

          <Card className="mt-5">
            <CardHeader>
              <h3 className="text-lg">Články</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              {userData.articles.map((page: any, index) => (
                <div key={index} className="ml-1">
                  <Link href={`/articles/create?id=${page.id}`}>
                    <p>{page.title}</p>
                  </Link>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div >
          <Card>
            <CardHeader>
              <h3 className="text-lg">Upraviť údaje</h3>
            </CardHeader>

            <Divider />

            <CardBody>
              <div className="">
                <Input
                  label="Nové meno"
                  placeholder="Zadajte nové meno"
                  value={UserChange}
                  onChange={(e) => setUserChange(e.target.value)}
                />
                <Input
                  className="mt-3"
                  label="Nové heslo"
                  placeholder="Zadajte nové heslo"
                  type="password"
                  value={PasswordChange}
                  onChange={(e) => setPasswordChange(e.target.value)}
                />
              </div>

              <div className="flex flex-row space-x-4 items-center mt-5">
                <Avatar alt="nextui logo" radius="sm" src={postImage.File} />
                <input
                  accept="image/*"
                  placeholder="Avatar"
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(e.target.files && e.target.files[0])
                  }
                />
              </div>
            </CardBody>

            <Divider />
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                variant="shadow"
                onClick={editmyuser}
              >
                Zmeniť informácie
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

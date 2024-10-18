"use client";
import React, { useState, useCallback } from "react";
import { Button, Divider, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Table
    , TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch
 } from "@nextui-org/react";
import { Emoji } from "emoji-picker-react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface articleData {
    id: string;
    title: string;
    author: string;
    emoji: string;
    category: string;
    isPublic: boolean;
}

const DeleteConfirmationModal = ({
    isOpen,
    onOpenChange,
    articleId,
    onDelete,
}: {
    isOpen: boolean;
    onOpenChange: () => void;
    articleId: string | null;
    onDelete: () => void;
}) => (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Potvrdenie Zmazania</ModalHeader>
            <ModalBody>
                <p>Ste si istý, že chcete zmazať tento článok? Táto akcia je nevratná.</p>
                <p>Po zmazaní článku sa nebudete môcť vrátiť späť. A je to navždy ámen 🙏</p>
                <Divider />
                <p>
                    <strong>Článok ID:</strong> {articleId}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onOpenChange}>
                    Zavrieť
                </Button>
                <Button color="primary" onPress={onDelete}>
                    Zmazať
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);

export default function AllArticles({
    articleData,
}: {
    articleData: articleData[];
}) {
    const [articleId, setArticleId] = useState<string | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const deleteModal = useCallback((id: string) => {
        setArticleId(id);
        onOpen();
    }, [onOpen]);

    const deleteArticle = useCallback(async () => {
        toast("Mažem článok...");
        onOpenChange();
        const response = await fetch("/api/admin/administrator/article/" + articleId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            toast.success("Článok bol úspešne zmazaný");
        } else {
            toast.error("Nepodarilo sa zmazať článok");
        }
    }, [articleId, onOpenChange]);

    return (
        <>
            <h1 className="text-center text-2xl my-5 font-bold">Všetky Články</h1>
            <Table removeWrapper aria-label="all articles" className="m-5">
        <TableHeader>
          <TableColumn>Názov</TableColumn>
          <TableColumn>Kategória</TableColumn>
          <TableColumn>Verejné</TableColumn>
          <TableColumn>Autor</TableColumn>
          <TableColumn>Akcie</TableColumn>
        </TableHeader>
        <TableBody>
          {articleData
          .map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Link className="flex align-items" href={`/article/${article.id}/?admin=true`}>
                  <Emoji size={20} unified={article.emoji} /> {article.title}
                </Link>
                </TableCell>
              <TableCell>{article.category.toUpperCase()}</TableCell>
              <TableCell>
                <Switch
                  isDisabled
                  isSelected={article.isPublic}
                />
              </TableCell>
                <TableCell>
                    <Link className="truncate" href={`/admin/administrator/users/edit/${article.author}`}>{article.author}</Link>
                </TableCell>
              <TableCell>
                <div className="flex">
                  <IconEdit
                    color="gray"
                    onClick={() =>
                      router.push(`/admin/articles/create?id=${article.id}`, undefined)
                    }
                  />
                  <IconTrash color="red" onClick={() => deleteModal(article.id)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

            <DeleteConfirmationModal
                articleId={articleId}
                isOpen={isOpen}
                onDelete={deleteArticle}
                onOpenChange={onOpenChange}
            />
        </>
    );
}

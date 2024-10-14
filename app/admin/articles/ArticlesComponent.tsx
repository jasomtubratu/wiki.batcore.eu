"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  useDisclosure,
} from "@nextui-org/react";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Emoji } from "emoji-picker-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { useRouterWithLoader } from "@/components/useRouterNprogress";

interface Article {
  id: string;
  title: string;
  category: string;
  emoji: string;
  isPublic: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  articleId,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  articleId: string | null;
  onDelete: () => void;
}) => (
  <Modal isOpen={isOpen} onOpenChange={onClose}>
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">
        Potvrdenie Zmazania
      </ModalHeader>
      <ModalBody>
        <p>
          Ste si istý, že chcete zmazať tento článok? Táto akcia je nevratná.
        </p>
        <p>
          Po zmazaní článku sa nebudete môcť vrátiť späť. A je to navždy ámen 🙏
        </p>
        <Divider />
        <p>
          <strong>Článok ID:</strong> {articleId}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Zavrieť
        </Button>
        <Button color="primary" onPress={onDelete}>
          Zmazať
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default function ArticleComponent({
  articles,
}: {
  articles: Article[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [articleId, setArticleId] = useState<string | null>(null);
  const router = useRouterWithLoader();

  const deleteModal = useCallback(
    (id: string) => {
      setArticleId(id);
      onOpen();
    },
    [onOpen]
  );

  const deleteArticle = useCallback(async () => {
    toast.loading("Mažem článok...");
    onOpenChange();
    try {
      const response = await fetch("/api/admin/article", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: articleId }),
      });

      if (response.ok) {
        toast.success("Článok bol úspešne zmazaný");
        window.location.reload();
      } else {
        toast.error("Nepodarilo sa zmazať článok");
      }
    } catch (error) {
      toast.error("Error occurred while deleting article");
    }
  }, [articleId, onOpenChange]);

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <h1 className="text-center text-2xl font-bold flex-grow text-center">
          Články
        </h1>
        <Button
          color="secondary"
          variant="shadow"
          onClick={() => router.push("/admin/articles/create", undefined)}
        >
          Vytvoriť článok
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-5 gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="m-1">
            <CardHeader className="flex justify-between">
              <Link
                className="flex"
                href={`/article/${article.id}/?batcore=true`}
              >
                <Emoji size={20} unified={article.emoji} />
                {article.title}
              </Link>
              <div className="flex">
                <IconEdit
                  color="gray"
                  onClick={() =>
                    router.push(
                      `/admin/articles/create?id=${article.id}`,
                      undefined
                    )
                  }
                />
                <IconTrash
                  color="red"
                  onClick={() => deleteModal(article.id)}
                />
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-sm text-gray-500">
                Kategória: {article.category.toUpperCase()}
              </p>
              <p className="text-sm text-gray-500">
                Verejné: {article.isPublic ? "Áno" : "Nie"}
              </p>
              <p className="text-sm text-gray-500">ID: {article.id}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <DeleteConfirmationModal
        articleId={articleId}
        isOpen={isOpen}
        onClose={onOpenChange}
        onDelete={deleteArticle}
      />
    </>
  );
}

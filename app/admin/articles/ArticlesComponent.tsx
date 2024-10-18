"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Input,
} from "@nextui-org/react";
import { IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
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
  const [search, setSearch] = useState("");

  const deleteModal = useCallback(
    (id: string) => {
      setArticleId(id);
      onOpen();
    },
    [onOpen]
  );

  const deleteArticle = useCallback(async () => {
    toast("Mažem článok...");
    onOpenChange();
    try {
      const response = await fetch("/api/admin/article/" + articleId, {
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
    } catch (error) {
      toast.error("Error occurred while deleting article");
    }
  }, [articleId, onOpenChange]);



  return (
    <>
      <div className="flex items-center justify-between my-5">
        <h1 className="text-center text-2xl font-bold flex-grow text-center">
          Tvoje Články
        </h1>
        <Button
          color="secondary"
          variant="shadow"
          onClick={() => router.push("/admin/articles/create", undefined)}
        >
          Vytvoriť článok
        </Button>
      </div>
      
      <div className="flex justify-center w-full my-5">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Píš pre vyhľadávanie...."
          size="sm"
          startContent={<IconSearch size={18} />}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Divider />

      <Table removeWrapper aria-label="all articles" className="m-5">
        <TableHeader>
          <TableColumn>Názov</TableColumn>
          <TableColumn>Kategória</TableColumn>
          <TableColumn>Verejné</TableColumn>
          <TableColumn>Akcie</TableColumn>
        </TableHeader>
        <TableBody>
          {articles
          .filter((article) =>
            search ? article.title.toLowerCase().includes(search.toLowerCase()) : true
          )
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
        onClose={onOpenChange}
        onDelete={deleteArticle}
      />
    </>
  );
}

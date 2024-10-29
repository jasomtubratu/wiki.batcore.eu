/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import nProgress from "nprogress";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateOrEditArticle() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [articleData, setArticleData] = useState({
    title: "",
    category: "",
    content: "",
    visibility: false,
    emoji: null as string | null,
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (id) fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    nProgress.start();
    try {
      const response = await fetch("/api/admin/article/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Nepodarilo sa načítať článok");

      const data = await response.json();
      const { title, category, content, emoji, isPublic } = data.article;

      setArticleData({ title, category, content, visibility: isPublic, emoji });
    } catch (error) {
      toast.error("Nastala chyba");
      router.push("/admin/articles");
    } finally {
      nProgress.done();
    }
  };

  const handleArticleSubmission = async () => {
    const endpoint = id ? "/api/admin/article/" + id : "/api/admin/article";
    const method = "POST";
    const body = JSON.stringify({
      ...articleData,
      isPublic: String(articleData.visibility),
      id,
    });

    try {
      toast(id ? "Upravujem článok..." : "Vytváram článok...");

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${Cookies.get("googlesesionid")}`,
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok)
        throw new Error("Niečo sa nám na ceste do databáze pokazilo :(");

      toast.success(
        id ? "Článok bol úspešne upravený" : "Článok bol úspešné vytvorený"
      );
      router.push("/admin/articles");
    } catch (error) {
      toast.error("Nastala chyba neznáma");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setArticleData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

  const selectEmoji = (emojiData: EmojiClickData) => {
    setArticleData((prevData) => ({ ...prevData, emoji: emojiData.unified }));
    setShowEmojiPicker(false);
  };

  const handleEditorChange = (content: string) => {
    setArticleData((prevData) => ({ ...prevData, content }));
  };

  return (
    <Card className="m-5">
      <CardHeader>{id ? "Upraviť článok" : "Vytvoriť článok"}</CardHeader>
      <CardBody className="gap-4">
        <Input
          required
          name="title"
          placeholder="Názov článku"
          value={articleData.title}
          onChange={handleInputChange}
        />
        <Select
          name="category"
          placeholder="Kategória"
          selectedKeys={[articleData.category]}
          onChange={handleInputChange}
        >
          <SelectItem key="minecraft" value="minecraft">
            Minecraft
          </SelectItem>
          <SelectItem key="vps" value="vps">
            VPS
          </SelectItem>
          <SelectItem key="ostatne" value="ostatne">
            Ostatné
          </SelectItem>
        </Select>
        <Input
          required
          placeholder="Výber emoji"
          value={
            articleData.emoji
              ? String.fromCodePoint(parseInt(articleData.emoji, 16))
              : ""
          }
          onClick={toggleEmojiPicker}
        />
        {showEmojiPicker && (
          <div className="fixed z-50">
            <EmojiPicker onEmojiClick={selectEmoji} />
          </div>
        )}
        <div className="z-50">
        <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        init={{
          skin: "oxide-dark",
          content_css: "dark",
          language: "sk",
          language_url: "/tinymce/sk.js",
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Early access to document converters
            "importword",
            "exportword",
            "exportpdf",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          exportpdf_converter_options: {
            format: "Letter",
            margin_top: "1in",
            margin_right: "1in",
            margin_bottom: "1in",
            margin_left: "1in",
          },
          exportword_converter_options: { document: { size: "Letter" } },
          importword_converter_options: {
            formatting: {
              styles: "inline",
              resets: "inline",
              defaults: "inline",
            },
          },
        }}
        onEditorChange={handleEditorChange}
        value={articleData.content}
        
      />
        </div>
        <Checkbox
          isSelected={articleData.visibility}
          onValueChange={(visibility) =>
            setArticleData((prevData) => ({ ...prevData, visibility }))
          }
        >
          Dať článok ako verejný?
        </Checkbox>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          color="primary"
          isDisabled={
            !articleData.title ||
            !articleData.category ||
            !articleData.emoji ||
            !articleData.content
          }
          variant="shadow"
          onClick={handleArticleSubmission}
        >
          {id ? "Upraviť článok" : "Vytvoriť článok"}
        </Button>
      </CardFooter>
    </Card>
  );
}

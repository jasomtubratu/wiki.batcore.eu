"use client";
import { Card, CardBody, CardFooter, CardHeader, Spinner } from "@nextui-org/react";
import { Emoji } from "emoji-picker-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { title, subtitle } from "@/components/primitives";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/main/footer";

interface Article {
  _id: string;
  title: string;
  emoji: string;
}

export default function Home() {
  const [articles, setArticles] = useState({
    //vps: [],
    minecraft: [],
    others: [],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    downloadTopArticles();
  }, []);

  async function downloadTopArticles() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/topArticles`);

      if (!response.ok) toast.error("Nastala chyba pri načítaní článkov!");
  
      const data = await response.json();

      setArticles(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occurred!");
      }
    }
  }
  

  const renderArticles = (category: keyof typeof articles, label: string, path: string) => (
    <Card
      isBlurred
      className="truncate border-gray-500/100 border-2 bg-background/60 dark:bg-default-100/50 hover:border-indigo-500/100 transform transition duration-500 hover:scale-110 max-w-64"
    >
      <CardHeader>
        <h1 className="font-bold text-xl">{label}</h1>
      </CardHeader>
      <CardBody>
        {articles[category].map((article: Article) => (
          <Link key={article._id} href={`/article/${article._id}`}>
            <p className="flex my-1 truncate">
              <Emoji size={25} unified={article.emoji} />
              {"⠀"}
              {article.title}
            </p>  
          </Link>
        ))}
      </CardBody>
      <CardFooter>
        <Link href={`/category/${path}`} onClick={() => router.push(`/category/${path}`)}>
          <p className="text-blue-500 text-sm">Prečítať viac</p>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>

        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Znalostná Databáza&nbsp;</h1>
          <h1 className={title({ color: "blue" })}>BatCore.eu&nbsp;</h1>

          <h2 className={subtitle({ class: "mt-4" })}>Ako ti môžeme dnes pomôcť?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <Spinner className="justify-center " />
          ) : (
            <>
              {/* {renderArticles("vps", "🖥️ VPS", "vps")} */}
              {renderArticles("minecraft", "🥦 Minecraft", "minecraft")}
              {renderArticles("others", "📙 Ostatné", "others")}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

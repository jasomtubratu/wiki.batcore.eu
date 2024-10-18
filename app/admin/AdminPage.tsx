"use client";

import { CardBody, Card, CardHeader, Link } from "@nextui-org/react";
import { IconArticle, IconFile } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";

export default function Admin({
  data,
}: {
  data: {
    totalArticles: number;
    user: string;
    latestArticles: { title: string; updatedAt: Date, id: string }[];
  };
}) {

  return (
    <>
      <div className="bg-background text-foreground p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Vítaj späť, {data.user}
        </h1>
        <h2 className="text-lg text-muted-foreground mb-6">
          Tu je súhrn základných informácií o tejto znalostnej databáze.
        </h2>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h1 className="text-sm font-medium">Článkov spolu</h1>
              <IconFile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">
                {data.totalArticles}
              </div>
            </CardBody>
          </Card>

          <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h1 className="text-sm font-medium">Posledné úpravy</h1>
              <IconArticle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardBody>
              <ul className="space-y-2">
                {data.latestArticles.map((article) => (
                    <li key={article.title} className="flex justify-between items-center">
                    <Link href={"/article/" + article.id}>
                    <span>
                        {article.title}
                    </span>
                    </Link>
                    <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}
                    </span>
                  </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

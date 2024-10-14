import { Role } from "@prisma/client";

export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    role: Role;
};

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: User & DefaultSession["user"];
    }
  }
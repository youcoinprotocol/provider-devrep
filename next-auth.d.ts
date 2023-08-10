import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: number;
    isClaimed: boolean;
    commitment?: string;
  }
  interface Session extends DefaultSession {
    user?: User;
  }
}

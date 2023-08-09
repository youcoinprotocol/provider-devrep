declare module "next-auth" {
  interface User {
    isClaimed: boolean;
    commitment?: string;
  }
}

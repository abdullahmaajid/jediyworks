import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    collaboratorId: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    collaboratorId: string | null;
  }
}

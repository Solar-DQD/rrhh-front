import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      tipoUsuario: 'Administrativo' | 'Recursos Humanos' | 'Administrador';
      proyecto: string;
    } & DefaultSession['user'];
  };

  interface User {
    id: string;
    name: string;
    email: string;
    tipoUsuario: 'Administrativo' | 'Recursos Humanos' | 'Administrador';
    proyecto: string;
  };
};

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    tipoUsuario: 'Administrativo' | 'Recursos Humanos' | 'Administrador';
  };
};
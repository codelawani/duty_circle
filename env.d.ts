declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    CLOUDINARY_API_SECRET: string;
    NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
    NEXT_PUBLIC_CLOUDINARY_NAME: string;
  }
}

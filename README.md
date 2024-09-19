# Next.js Authentication Template

This project is a template for authentication using [Auth.js](https://authjs.dev/) in a [Next.js](https://nextjs.org/) application, with [Supabase](https://supabase.com/) as the backend database and [Prisma](https://www.prisma.io/) as the ORM.

## Features

- Authentication using NextAuth.js
- Supabase integration for database and storage
- Prisma as the database ORM
- Protected routes and user session management
- Easy deployment on platforms like Vercel

## Requirements

- Node.js (v14 or later)
- Supabase
- Prisma
- PostgresSQL (for local testing)

## Getting Started

### 1. Set up Supabase

In this project, supabase is used as database for users handling.

- Login to your supbase dashboard
- Create a new project
- Click connect button and copy the environment variables.
- https://dev.to/heinhtoo/implementing-authjs-v5-with-prisma-and-supabase-in-nextjs-lie

### 2. Clone the Repository

```
git clone https://github.com/heinhtoo/next-auth-template.git
cd next-auth-template
```

### 3. Install Dependencies

Before running the app, make sure to install the necessary packages:

```
npm install
```

### 4. Set Up Environment Variables

Create a .env file in project root with the following content:

```
# Database URL from supabase or local postgresSQL database
# https://dev.to/heinhtoo/implementing-authjs-v5-with-prisma-and-supabase-in-nextjs-lie
DATABASE_URL=
DIRECT_URL=


NEXTAUTH_URL="http://localhost:3000"
# Added by `npx auth`. Read more: https://cli.authjs.dev
AUTH_SECRET=

# GitHub Provider
# https://dev.to/heinhtoo/integrating-github-authentication-with-nextauthjs-a-step-by-step-guide-1fo4
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# LinkedIn Provider
# https://dev.to/heinhtoo/integrating-linkedin-authentication-with-nextauthjs-a-step-by-step-guide-4dmg
AUTH_LINKEDIN_ID=
AUTH_LINKEDIN_SECRET=

# Magic Link Provider
AUTH_MAIL_FROM=
AUTH_MAIL_PWD=
AUTH_MAIL_HOST=
AUTH_MAIL_PORT=
```

### 5. Migrate the database

Since the prisma is already initialize and setup, you need to run this command to apply the schema to your supabase.

```
npx prisma migrate dev
```

### 6. Run the application

You are now ready to run the development server:

```
npm run dev
```

### 7. Deploy to Vercel (Optional)

When deploying the app to vercel, you need to overwrite the build command.

```
prisma generate & next build
```

After that you need to make sure all the environment variables are added in the vercel too.

---

### Note

This template is designed for using supabase so if you are going to change the environment variables make sure the migrations are also applied in the database.

---

### Additional Resources

- [Implementing auth.js v5 with Prisma and Supabase in Next.js](https://dev.to/heinhtoo/implementing-authjs-v5-with-prisma-and-supabase-in-nextjs-lie)
- [Integrating LinkedIn Authentication with NextAuth.js: A Step-by-Step Guide](https://dev.to/heinhtoo/integrating-linkedin-authentication-with-nextauthjs-a-step-by-step-guide-4dmg)
- [Integrating GitHub Authentication with NextAuth.js: A Step-by-Step Guide](https://dev.to/heinhtoo/integrating-github-authentication-with-nextauthjs-a-step-by-step-guide-1fo4)

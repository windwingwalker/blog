# Blog

## Background

This is a front-end application of my blog.

## Tech stack

- Basic web application elements: HTML, CSS, JavaScript
- Server framework:  Node.js
- Front-end frameworks / libraries: React.js, Next.js
- Front-end hosting platform: Vercel
- <span><img src="https://img.shields.io/npm/types/typescript"/></span>

## Get started

- If you want to run it on local
  - `npm run dev`
  - Then open http://localhost:3000 with your browser to see the result.
- If you want to build: `npm run build`
- If you want to run it on production environment: `npm run start`

## Enviroment Variables (ENV var)

This application adopts <a href="https://nextjs.org/docs/basic-features/environment-variables">Next.js official best practices in environment variables</a>

| How to store | Environment | .gitignore | Purpose |
| --- | --- | --- | --- |
| File (.env.local) | Development | Yes | Stores the secrets, currently only AWS credentials. It can overrides default set |
| File (.env.development) | Development | No | Default values of ENV var, excluding secrets |
| File (.env.production) | Production | No | Default values of ENV var, excluding secrets |
| Hosting platform (Vercel) | Production | N/A | Stores the secrets, currently only AWS credentials. |

It is worth to mention that the values of ENV var "NODE_ENV", defined in scripts session of package.json, determine which enviroment the apllication is using. Its value can only be "production", "development" or "test".

Also, the AWS credentials ENV var key should be "REACT_APP_AWS_ACCESS_KEY_ID" instead of "AWS_ACCESS_KEY_ID", "REACT_APP_AWS_SECRET_ACCESS_KEY" instead of "AWS_SECRET_ACCESS_KEY". The reason is the unresolved bugs of Vercel platform's ENV var function. You can check out this <a href="https://github.com/orgs/vercel/discussions/1338#discussioncomment-4692590">issue</a> for details.

# Blog

## Background

This is a front-end application of [my blog](https://windwingwalker.xyz).

## Tech stack

- Basic web application elements: HTML, CSS, JavaScript
- Programming language: TypeScript
- Runtime environment:  Node.js
- Front-end frameworks / libraries: React.js, Next.js
- UI framwork: Material UI
- Hosting platform: Vercel

## Get started

- If you want to run it on local
  - `npm run dev`
  - Then open http://localhost:3000 with your browser to see the result.
- If you want to build: `npm run build`
- If you want to run it on production environment: `npm run start`

## Enviroment Variables (ENV var)

This application adopts [Next.js official best practices in environment variables](https://nextjs.org/docs/basic-features/environment-variables)

| How to store | Environment | .gitignore | Purpose |
| --- | --- | --- | --- |
| File (.env.local) | Development | Yes | Stores the secrets, currently only AWS credentials. It can overrides default set |
| File (.env.development) | Development | No | Default values of ENV var, excluding secrets |
| File (.env.production) | Production | No | Default values of ENV var, excluding secrets |
| Hosting platform (Vercel) | Production | N/A | Stores the secrets, currently only AWS credentials. |

It is worth to mention that the values of ENV var `NODE_ENV", defined in scripts session of package.json, determine which enviroment the apllication is using. Its value can only be "production", "development" or "test".

Also, the AWS credentials ENV var key should be `REACT_APP_AWS_ACCESS_KEY_ID` instead of `AWS_ACCESS_KEY_ID`, `REACT_APP_AWS_SECRET_ACCESS_KEY` instead of `AWS_SECRET_ACCESS_KEY`. The reason is the unresolved bugs of Vercel platform's ENV var function. You can check out [this issue](https://github.com/orgs/vercel/discussions/1338#discussioncomment-4692590) for details.

## Folder Structure

- `pages/`: Standard folder from Next.js. Each file represent a page that having unique URL.
- `public/`: For storing images
- `shared/`: For handling states, constants, or some global configs
- `styles/`: For storing `.css`
- `models/`: For storing object / model
- `functions/`: For storing function / calculation / logic that are **not UI related**. Each function should be able to perform unit test.
- `components/`: For storing UI components, no calculation involved.
- `data/`: For storing some public data / wordings that is seldomly changed.

## Reference

### Next.js

- [Next.js + 各種套件組合 :: 2018 iT 邦幫忙鐵人賽](https://ithelp.ithome.com.tw/users/20103438/ironman/1308)
- https://stackoverflow.com/questions/65078245/how-to-make-next-js-getstaticprops-work-with-typescript
- https://github.com/vercel/next.js/blob/canary/examples/with-typescript/pages/users/%5Bid%5D.tsx
- [How to add an image in next.js?](https://medium.com/nextjs/how-to-add-an-image-in-next-js-5c1065450e3a)
- [Protect your API routes in Next.js with Middleware](https://blog.tericcabrel.com/protect-your-api-routes-in-next-js-with-middleware/)
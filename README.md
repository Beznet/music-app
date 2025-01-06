## Title

This is a simple music application that queries an API for songs and allows users to create their own custom playlist.

## Getting Started

First, install dependencies using npm, pnpm yarn or bun. Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Decisions

I chose to go with NextJS for quick local deployment right out of the box for this frontend application.
NextUI-Table to reduce time making a custom table from scratch in order to produce an MVP of the songs list.
Tailwind CSS was added to get some really simple styling completed using classNames.

## Optimizations

I would have liked to include Unit tests on my components to make sure the outputs of sorting and playlist creation was what we expect.

I also would have liked to add sorting directly on the table itself by column clicks but the library was proving a bit more difficult to work with, so I opted to create a simple dropdown solution instead to complete the MVP.

More styling and mobile friendly optimizations would have also been preferred for users on smaller devices.

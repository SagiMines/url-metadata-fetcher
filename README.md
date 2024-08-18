# URL Metadata Fetcher

<div align='center'>
<a href="https://github.com/SagiMines/url-metadata-fetcher">
<img src="https://i.postimg.cc/x8d9Sgg1/fetcher.png"/>
</a>
</div>

This full-stack application allows users to input a list of URLs, fetch metadata (title, description, and an image) for each URL, and display the results.

## Prerequisites

- Node.js (v14 or later)
- npm

## Setup

1. Clone the repository:

```bash
git clone https://github.com/SagiMines/url-metadata-fetcher.git
cd url-metadata-fetcher
```

2. Install dependencies:

```bash
npm install
```

3. Install dependencies for the server:

```bash
cd server
npm install
cd ..
```

4. Install dependencies for the client:

```bash
cd client
npm install
cd ..
```

## Environment Variable

In order to run this application, you will need to add an `.env` file to `client` folder with the following environment variable included:

- `VITE_SERVER_DOMAIN` - The local server url which is by default: `http://localhost:3001`

## Running the Application

1. Start the server:

```bash
cd server
npm run dev
```

2. In a new terminal, start the client:

```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Running Tests

- To run server tests, from the app root:

```bash
cd server
npm run test
```

- To run client tests, from the app root:

```bash
cd client
npm run test
```

## Design Choices and Trade-offs

1. Rate Limiting: Implemented using `express-rate-limit` to handle a maximum of 5 requests per second. This ensures the server doesn't get overwhelmed with requests.

2. Security: Used `helmet` middleware to set various HTTP headers for security. CORS is enabled to allow requests from the frontend.

3. Error Handling: Implemented error handling on both frontend and backend to provide a smooth user experience.

4. Metadata Extraction: Used `cheerio` for HTML parsing. It's lightweight and efficient for our use case, though it may not handle dynamic content as well as a headless browser would.

5. Testing: Implemented unit tests for both frontend and backend to ensure reliability.

6. UI Design: Kept the UI simple and responsive, focusing on functionality.

## Deployment

This application is deployed on Vercel:

- **[Live Demo](https://url-metadata-fetcher-client-eta.vercel.app/)**

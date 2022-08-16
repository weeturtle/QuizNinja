import { Html, Head, Main, NextScript } from 'next/document';

// Defines how the app is rendered on the server side.
// This returns the normal `<html>` and `<body>` elements.
export default function Document() {
  return (
    <Html>
      <Head>
        {/* Imports Roboto to be used as a font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
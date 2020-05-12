import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
import reload from 'reload';

const app = express();
const port = 4000;

app.use(express.static('public'));

const dev = process.env.NODE_ENV === 'development';

if (dev) {
  reload(app);
}

app.use((req, res) => {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(sheet.collectStyles(<App />));
    const styleTags = sheet.getStyleTags();

    res.send(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Hackernews</title>
            <style>
            body {
                margin: 0 auto;
            }
            </style>
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${html}</div>
            <script src="main.js" async></script>
            ${dev ? '<script src="/reload/reload.js" async></script>' : ''}
        </body>
    </html>`);
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

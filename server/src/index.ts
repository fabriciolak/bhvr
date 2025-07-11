import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import type { ApiResponse } from "shared/dist";
import { createCanvas, loadImage } from 'canvas';

const app = new Hono();
 
// CORS is optional for single origin deployment
// Keep for development flexibility, remove for production if desired
app.use(cors());
 
// Your existing API routes - keep the /api prefix for clarity
app.get("/api", (c) => {
  return c.text("Hello Hono!");
});
 
app.get("/api/hello", async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true,
  };
  return c.json(data, { status: 200 });
});
 
// Add more API routes here with /api prefix
// app.get('/api/users', ...)
// app.post('/api/data', ...)
 
// Serve static files for everything else
app.use("*", serveStatic({ root: "./static" }));
 
app.get("*", async (c, next) => {
  return serveStatic({ root: "./static", path: "index.html" })(c, next);
});

app.post('/generate-image', async (c) => {
  // Recebe os dados do body (campos a serem editados)
  const { text, fontSize = 40, x = 50, y = 50, color = 'black' } = await c.req.json();

  // Cria um canvas
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

 // Configura o texto
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
 
  // Carrega uma imagem de fundo (substitua pelo caminho da sua imagem)
  const background = await loadImage("https://images.unsplash.com/photo-1752035197224-6e6bdc4f7fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  ctx.drawImage(background, 0, 0, 500, 500);
  // Converte o canvas para buffer (PNG)
  const buffer = canvas.toBuffer('image/png');

  // Retorna a imagem
  c.header('Content-Type', 'image/png');
  return c.body(buffer);
});

const port = parseInt(process.env.PORT || "3000");
 
export default {
  port,
  fetch: app.fetch,
};
 
console.log(`🦫 bhvr server running on port ${port}`);

// import express from 'express';
// import cors from 'cors';
// import chalk from 'chalk';
// import dotenv from 'dotenv';
// import path from 'path';
// import routes from './routes';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// const startTime = performance.now();

// // Serve arquivos estáticos do client/dist com MIME types corretos
// app.use(express.static(path.join(__dirname, '../../client/dist'), {
//   setHeaders: (res, filePath) => {
//     // Opcional: forçar MIME types específicos, mas express.static já lida bem
//     const mimeTypes = {
//       '.html': 'text/html',
//       '.css': 'text/css',
//       '.js': 'application/javascript',
//       '.png': 'image/png',
//       '.jpg': 'image/jpeg',
//       '.svg': 'image/svg+xml',
//       '.woff': 'font/woff',
//       '.woff2': 'font/woff2',
//       '.ico': 'image/x-icon',
//     };
//     const ext = path.extname(filePath).toLowerCase();
//     if (mimeTypes[ext]) {
//       res.setHeader('Content-Type', mimeTypes[ext]);
//     }
//   },
// }));

// // Rotas da API
// app.use(cors());
// app.use(express.json());
// app.use('/api', routes);

// // Fallback para SPA (serve index.html para rotas não-API)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/dist/index.html'), {
//     headers: { 'Content-Type': 'text/html' },
//   });
// });

// app.listen(PORT, () => {
//   const duration = Math.round(performance.now() - startTime);
//   console.log(chalk.blue(`\n🚀 SERVER ready in ${duration} ms\n`));
//   console.log(chalk.blue(`➜  Local:   http://localhost:${PORT}/\n`));
// });

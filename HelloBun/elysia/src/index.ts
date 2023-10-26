import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => "Hello, World!");
app.get("/ping", () => "pong");
app.post("/jsonToData", ({ body }) => body);

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

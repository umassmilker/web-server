import express from "express";
import projects from "./projects.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, thomas! welcome to CS326");
});
app.get("/projects", (req, res) => {
  res.send(projects);
});
app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, post ${postId}`);
});
app.get("/search", (req, res) => {
  const term = req.query.term || "nothing";
  const limit = parseInt(req.query.limit) || 5;
  res.send(`Searching for "${term}", showing ${limit} results.`);
});
app.get('/api/user/:id', (req, res) => {
  if (req.params.id !== '1') {
    res.status(404).send('User not found.');
    return;
  }
  res.json({ id: '1', name: 'Alice' });
});
app.get('/hello/:name', (req, res) => {
  res.send(`Hello, ${req.params.nname}!`);
});
app.get('/broken', (req, res) => {
  const user = undefined;
  res.send(user.name);
});
app.use((req, res) => {
  res.status(404).send("page not found");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

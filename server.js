import express from "express";
import projects from "./projects.js";
import { join } from "path";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
const entries = [
    { title: "First note", body: "notes from first section" },
    { title: "Second note", body: "notes from second section" },
    { title: "Third note", body: "notes from third section" },
  ];

const events = [
  { title: "Career fair" },
  { title: "Hackathon kickoff", date: "2024-07-20" },
  { title: "Guest lecture", date: "2024-06-16" },
];
const people = [
  {name: "thomas", age: 19},
  {name: "juan", age: 20},
]
app.set("view engine", "ejs");
app.set("views", "views");
app.get("/", (req, res) => {
  res.sendFile(join(import.meta.dirname, "public", "index.html"));
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get('/entries', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60');
  res.set('X-Total-Count', entries.length);
  res.status(200).render('entries', { title: 'My Notes', entries });
});x``
app.get('/entries', (req, res) => {
  res.set('X-Total-Count', entries.length);
  res.status(200).render('entries', { title: 'My Notes', entries });
});
app.get('/entries', (req, res) => {
  const accept = req.get('Accept');
  console.log(accept); // */* from curl, a string
  res.set('X-Total-Count', entries.length);
  res.status(200).render('entries', { title: 'My Notes', entries });
});
app.get("/people", (req, res) => {
  res.render("people", { title: "People", people });
});
app.post("/entries", (req, res) => {
  const {title, body} = req.body;
  const newEntry = { title, body };
  if(!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }
  entries.push(newEntry);
  res.status(201).json(newEntry);
});
app.delete('/entries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id) || id < 0 || id >= entries.length) {
    res.status(404).json({ error: 'Entry not found' });
    return;
  }
  entries.splice(id, 1);
  res.status(204).send();
});
app.post("/people", (req, res) => {
  const {name, age} = req.body;
  const newEntry = { name, age };
  if(!name || !age) {
    return res.status(400).json({ error: "Name and Age are required." });
  }
  people.push(newEntry);
  res.status(201).json(newEntry);
});
app.get("/events", (req, res) => {
  res.render("events", { events });
});
app.get("/", (req, res) => {
  res.send("Hello, thomas! welcome to CS326");
});
app.use("/", projects);

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
app.get("/api/user/:id", (req, res) => {
  if (req.params.id !== "1") {
    res.status(404).send("User not found.");
    return;
  }
  res.json({ id: "1", name: "Alice" });
});
app.get("/hello/:name", (req, res) => {
  res.send(`Hello, ${req.params.nname}!`);
});
app.get("/broken", (req, res) => {
  const user = undefined;
  res.send(user.name);
});
app.use((req, res) => {
  res.status(404).send("page not found");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

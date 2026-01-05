import express from "express";
import cors from "cors";
import { storage } from "./storage.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Epic Pavers internal API is running"
  });
});

// --------------------
// PROJECT ROUTES
// --------------------
app.get("/api/projects", async (req, res) => {
  res.json(await storage.getProjects());
});

app.post("/api/projects", async (req, res) => {
  const project = await storage.createProject(req.body);
  res.status(201).json(project);
});

app.put("/api/projects/:id", async (req, res) => {
  const updated = await storage.updateProject(req.params.id, req.body);
  res.json(updated);
});

app.delete("/api/projects/:id", async (req, res) => {
  await storage.deleteProject(req.params.id);
  res.json({ success: true });
});

// Seed data
const existing = await storage.getProjects();
if (existing.length === 0) {
  await storage.createProject({
    poNumber: "PO-1001",
    customerName: "Epic Pavers Office",
    address: "123 Paver Lane",
    status: "In Progress",
    assignedCrew: "Team Alpha",
    notes: "Seed project for internal testing"
  });
}

app.listen(PORT, () => {
  console.log(`Epic Pavers app running on port ${PORT}`);
});

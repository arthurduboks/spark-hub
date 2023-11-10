const express = require("express");
const router = express.Router();

// Temp test data
const ideas = [
  {
    id: 1,
    text: "A wearable device that translates your pet's sounds and body language into spoken words.",
    tag: "Technology",
    username: "JamesBond23",
    date: "2023-01-22",
  },
  {
    id: 2,
    text: "An eco-friendly, self-replenishing water bottle that filters and condenses moisture from the air.",
    tag: "Inventions",
    username: "Einstein22",
    date: "2023-05-15",
  },
  {
    id: 3,
    text: "A virtual reality game that lets you design and explore your own dream worlds.",
    tag: "Gaming",
    username: "Gameboy91",
    date: "2023-09-14",
  },
];

// Get all ideas
router.get("/", (req, res) => {
  res.json({ success: true, data: ideas });
});

// Get single idea
router.get("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  // Handle error
  if (!idea) {
    return res.status(404).json({ success: false, error: "Idea not found :(" });
  }
  res.json({ success: true, data: idea });
});

// Add an idea
router.post("/", (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  // Push new idea to an Array
  ideas.push(idea);

  res.json({ success: true, data: idea });
});

// Update idea
router.put("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  // Handle error
  if (!idea) {
    return res.status(404).json({ success: false, error: "Idea not found :(" });
  }

  idea.text = req.body.text || idea.text;
  idea.tag = req.body.text || idea.tag;

  res.json({ success: true, data: idea });
});

// Delete idea
router.delete("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);
  // Handle error
  if (!idea) {
    return res.status(404).json({ success: false, error: "Idea not found :(" });
  }

  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  res.json({ success: true, data: {} });
});

module.exports = router;

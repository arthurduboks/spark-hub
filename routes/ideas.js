const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// Fake data to test endpoints w/o database
// const ideas = [
//   {
//     id: 1,
//     text: "A wearable device that translates your pet's sounds and body language into spoken words.",
//     tag: "Technology",
//     username: "JamesBond23",
//     date: "2023-01-22",
//   },
//   {
//     id: 2,
//     text: "An eco-friendly, self-replenishing water bottle that filters and condenses moisture from the air.",
//     tag: "Inventions",
//     username: "Einstein22",
//     date: "2023-05-15",
//   },
//   {
//     id: 3,
//     text: "A virtual reality game that lets you design and explore your own dream worlds.",
//     tag: "Gaming",
//     username: "Gameboy91",
//     date: "2023-09-14",
//   },
// ];

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong..." });
  }
});

// Get single idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong..." });
  }
});

// Add an idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong..." });
  }
});

// Update idea
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }
    // Username != match
    res.status(403).json({
      success: false,
      error: "You are not authorized to update this",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong..." });
  }
});

// Delete idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    // Match the username
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Username != match
    res
      .status(403)
      .json({ success: false, error: "You are not authorized to delete this" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong..." });
  }
});

module.exports = router;

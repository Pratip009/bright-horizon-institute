const QuickProgram = require("../models/QuickPrograms");

// Get all quick programs (public)
exports.getQuickPrograms = async (req, res) => {
  try {
    const programs = await QuickProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching quick programs:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Get one quick program by ID (public)
exports.getQuickProgramById = async (req, res) => {
  try {
    const program = await QuickProgram.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    console.error("Error fetching quick program by ID:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Create a new quick program (admin only)
exports.createQuickProgram = async (req, res) => {
  try {
    // Add createdBy from authenticated user (assuming req.user.id is set by auth middleware)
    const programData = {
      ...req.body,
      price: Number(req.body.price), // ensure price is a Number
      content: Array.isArray(req.body.content)
        ? req.body.content
        : [req.body.content], // ensure content is array of strings
      createdBy: req.user.id,
    };

    const program = new QuickProgram(programData);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    console.error("Error creating quick program:", error);
    res.status(400).json({ error: "Invalid data: " + error.message });
  }
};

// Update quick program by ID (admin only)
exports.updateQuickProgram = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      content: req.body.content
        ? Array.isArray(req.body.content)
          ? req.body.content
          : [req.body.content]
        : undefined,
    };

    // Remove undefined fields from updateData
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const program = await QuickProgram.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    console.error("Error updating quick program:", error);
    res.status(400).json({ error: "Invalid data: " + error.message });
  }
};

// Delete quick program by ID (admin only)
exports.deleteQuickProgram = async (req, res) => {
  try {
    const program = await QuickProgram.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting quick program:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

const express = require("express");
const db = require("../config/database");
const router = express.Router();

router.get("/ping", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ s: 'ok', d: new Date().toISOString() });
  } catch (err) {
    console.error("Ping failed:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;

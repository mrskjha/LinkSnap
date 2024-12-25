const shortid = require("shortid");
const URL = require("../models/url"); // Ensure the path and model are correct

async function handleGenerateUrl(req, res) {
  const body = req.body;

  // Validate request body
  if (!body || !body.url) {
    return res.status(400).json({ message: "Invalid request: URL is required" });
  }

  const ShortId = shortid.generate(); // Generate the shortened ID

  try {
    // Create a new URL document
    const newUrl = await URL.create({
      shorturl: ShortId,
      redirectUrl: body.url,
      visitHistory: [],
    });

    return res.render("home", { id: ShortId });  // Pass the generated ShortId to the view
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortUrl = req.params.shortUrl;
  const result = await URL.findOne({ shorturl: shortUrl });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateUrl, handleGetAnalytics };

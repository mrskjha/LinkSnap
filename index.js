const express = require("express");
const path = require("path");
const connectToMongoose = require("./connectUrl");
const urlRouter = require("./routers/url");
const URL = require("./models/url");
const staticRouter = require("./routers/staticRouter");

const app = express();
connectToMongoose("mongodb+srv://sunny:sunny@urls.jx3yy.mongodb.net/?retryWrites=true&w=majority&appName=urls")
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to Database:", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.get("/", async (req, res) => {
  const allUrls = await URL.find();
  return res.render("home", {
    urls: allUrls,
    name: "Home",
  });
});

app.use("/url", urlRouter);

app.use("/", staticRouter);

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const entry = await URL.findOneAndUpdate(
      { shorturl: shortUrl },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      },
      { new: true } // Return the updated document
    );

    // Check if the entry exists
    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Redirect to the stored URL
    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error handling short URL redirect:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Default route for handling 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server listening
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

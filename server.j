const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Chat API route
app.post("/api/chat", async (req, res) => {
try {
const userMessage = req.body.message;

if (!userMessage) {
return res.status(400).json({
error: "Message is required"
});
}

const response = await fetch(process.env.N8N_WEBHOOK, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
message: userMessage
})
});

const data = await response.json();

res.json({
reply: data.reply || "No response received."
});

} catch (error) {
console.error("Chat error:", error);

res.status(500).json({
error: "AI service unavailable"
});
}
});

// Start server
app.listen(PORT, () => {
console.log(`AlphaX server running on port ${PORT}`);
});

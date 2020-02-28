import express from "express";
const app = express();
export const PORT = process.env.PORT || 5555;
export const SEND_FILE_URL = "http://localhost/myTestUrl";

app.get("/signedUrl", (_req, res) => {
  res.json({ url: `http://localhost:${PORT}/sendFile` });
});

app.post("/sendFile", (_req, res) => {
  res.json({ url: SEND_FILE_URL });
});

export default app;

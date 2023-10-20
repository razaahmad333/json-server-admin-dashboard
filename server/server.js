import express from "express";
import chalk from "chalk";
import router from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 3214;

app.use(express.static("dashboard-ui"));
app.use(express.json());

app.use((req, res, next) => {
  console.log(JSON.stringify({
    "Incoming request": {
      method: req.method,
      url: req.originalUrl,
    },
  }, null, 2));

  next();
});

app.get("/", async (req, res) => {
  res.sendFile("index.html");
});

app.use("/api", router);



export function startApp() {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} 🚀`);
    const dashboardURL = `http://localhost:${PORT} `;
    console.log();
    console.log(chalk.whiteBright("Dashboard: " + dashboardURL + " 📈"));
    console.log();
    console.log(chalk.dim("Press Ctrl+C to quit." + " ⚙️"));
    console.log();
  });

 
}

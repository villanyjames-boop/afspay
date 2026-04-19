const express = require("express");
const { createCheckout, verifyPayment } = require("./afs");

const app = express();
app.use(express.json());

// Create checkout
app.post("/api/afs/checkout", async (req, res) => {
  const { amount, email } = req.body;

  try {
    const data = await createCheckout(amount, email);
    res.json({ checkoutId: data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Result page
app.get("/afs/result", async (req, res) => {
  const resourcePath = req.query.resourcePath;

  try {
    const data = await verifyPayment(resourcePath);

    res.send(`
      <h1>Payment Result</h1>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `);
  } catch (err) {
    res.send("Payment verification failed");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

const express = require("express");
const { createCheckout, verifyPayment } = require("./afs");

const app = express();
app.use(express.json());

// CREATE CHECKOUT
app.post("/api/afs/checkout", async (req, res) => {
  const { amount, email } = req.body;

  try {
    const data = await createCheckout(amount, email);
    res.json({ checkoutId: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// RESULT PAGE
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

// Railway PORT fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));

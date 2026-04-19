const BASE_URL = "https://eu-prod.oppwa.com";
const ENTITY_ID = "8ac7a4c992f92edd0192fb4e934a0372";
const API_KEY = "OGFjN2E0Yzk5MmY5MmVkZDAxOTJmYjRlMDQ4NDAzNmV8aURYTnI3OjMrIW09ZSt1cSVZTUY=";

async function createCheckout(amount, email) {
  const url = `${BASE_URL}/v1/checkouts`;

  const params = new URLSearchParams({
    entityId: ENTITY_ID,
    amount: amount,
    currency: "AED",
    paymentType: "DB",
    "customer.email": email,
    "billing.country": "AE"
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  return await response.json();
}

async function verifyPayment(resourcePath) {
  const url = `${BASE_URL}${resourcePath}?entityId=${ENTITY_ID}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });

  return await response.json();
}

module.exports = { createCheckout, verifyPayment };

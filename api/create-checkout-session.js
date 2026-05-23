/**
 * Vercel Serverless Function: Create Stripe Checkout Session
 * 
 * This is a PLACEHOLDER. It will not work until:
 * 1. You have a Stripe account with STRIPE_SECRET_KEY set in Vercel env vars.
 * 2. You have created a Pro plan price in Stripe and set STRIPE_PRICE_ID_PRO.
 * 3. You deploy to Vercel.
 *
 * Endpoint: POST /api/create-checkout-session
 * Body: { userId, email }
 * Returns: { url } (Stripe Checkout URL to redirect to)
 */

// import Stripe from 'stripe' // Uncomment when Stripe is installed on server

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Placeholder response until Stripe is configured
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return res.status(503).json({
      error: 'Stripe is not configured yet. Set STRIPE_SECRET_KEY in Vercel environment variables.',
    })
  }

  /*
  // === REAL IMPLEMENTATION (uncomment when ready) ===
  const stripe = new Stripe(stripeSecretKey)
  const { userId, email } = req.body

  if (!userId || !email) {
    return res.status(400).json({ error: 'Missing userId or email' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_PRO,
          quantity: 1,
        },
      ],
      metadata: {
        supabase_user_id: userId,
      },
      success_url: `${process.env.VITE_APP_URL || 'http://localhost:5173'}/account?success=true`,
      cancel_url: `${process.env.VITE_APP_URL || 'http://localhost:5173'}/account?canceled=true`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
  */

  return res.status(503).json({ error: 'Stripe checkout not yet implemented. See api/create-checkout-session.js' })
}

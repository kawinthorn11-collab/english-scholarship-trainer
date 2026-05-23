/**
 * Vercel Serverless Function: Stripe Webhook Handler
 *
 * This is a PLACEHOLDER. It will not work until:
 * 1. You have Stripe configured with STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.
 * 2. You have Supabase configured with a service role key.
 * 3. You deploy to Vercel and register the webhook URL in Stripe Dashboard.
 *
 * Endpoint: POST /api/stripe-webhook
 * Stripe sends events here automatically.
 *
 * Events handled:
 * - checkout.session.completed
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - invoice.payment_succeeded
 * - invoice.payment_failed
 */

// import Stripe from 'stripe'
// import { createClient } from '@supabase/supabase-js'

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body for signature verification
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return res.status(503).json({ error: 'Stripe webhook not configured' })
  }

  /*
  // === REAL IMPLEMENTATION (uncomment when ready) ===
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key — never expose to frontend
  )

  // Read raw body for signature verification
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const rawBody = Buffer.concat(chunks).toString('utf8')

  let event
  try {
    const sig = req.headers['stripe-signature']
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.metadata?.supabase_user_id
      const customerId = session.customer
      const subscriptionId = session.subscription

      if (userId) {
        await supabaseAdmin.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: 'active',
          plan: 'pro',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      const status = subscription.status // active, past_due, canceled, unpaid
      const periodEnd = new Date(subscription.current_period_end * 1000).toISOString()

      await supabaseAdmin.from('subscriptions')
        .update({
          status: status === 'active' ? 'active' : status,
          plan: status === 'active' ? 'pro' : 'free',
          current_period_end: periodEnd,
          updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object
      await supabaseAdmin.from('subscriptions')
        .update({ status: 'past_due', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', invoice.customer)
      break
    }

    default:
      // Unhandled event type
      break
  }

  return res.status(200).json({ received: true })
  */

  return res.status(503).json({ error: 'Stripe webhook not yet implemented. See api/stripe-webhook.js' })
}

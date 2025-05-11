import React from 'react';
import { CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual test publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51KTXdfAdNb9itLY3GwmCtC5xxGpWJzoYFJQKBbnaACAYVBnqJX1amZOmiJtfWip1DwVQs40CHu2VPmWdcYmZsuOG006ixtMpsL'; // Example Test Key
let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const Pricing = () => {
  const plans = [
    { 
      name: 'Free', 
      price: '$0', 
      features: ['Basic QR Types', 'Standard Customization', 'Unlimited Generations', 'Community Support'], 
      cta: 'Get Started',
      priceId: null // No Stripe checkout for free plan
    },
    { 
      name: 'Pro', 
      price: '$9', 
      priceSuffix: '/mo', 
      features: ['All QR Types', 'Advanced Customization', 'Analytics', 'Logo Upload', 'Priority Support'], 
      cta: 'Go Pro', 
      popular: true,
      priceId: 'price_1PAbcdEfghIjklMnOpqRsTuV' // Replace with your actual Stripe Price ID for Pro plan
    },
    { 
      name: 'Business', 
      price: '$29', 
      priceSuffix: '/mo', 
      features: ['All Pro Features', 'Bulk Generation', 'API Access', 'Team Collaboration', 'Dedicated Support'], 
      cta: 'Choose Business',
      priceId: 'price_1PAbcdefGhijKlmnOpQrStUv' // Replace with your actual Stripe Price ID for Business plan
    },
  ];

  const handleCheckout = async (priceId) => {
    if (!priceId) {
      // For free plan or plans without a priceId, you might navigate to a signup page or do nothing
      console.log("No Price ID for this plan.");
      // Example: window.location.href = '/signup';
      return;
    }

    const stripe = await getStripe();
    
    // For a real application, you would typically create a Checkout Session on your backend
    // and redirect to Stripe using the session ID.
    // Example:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ priceId }),
    // });
    // const session = await response.json();
    // const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

    // For this client-side only example, we'll use lineItems.
    // This is suitable for one-time payments. For subscriptions, a backend-created session is recommended.
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription', // or 'payment' for one-time
      successUrl: `${window.location.origin}/?session_id={CHECKOUT_SESSION_ID}`, // Replace with your success URL
      cancelUrl: `${window.location.origin}/`, // Replace with your cancel URL
    });

    if (error) {
      console.warn('Error redirecting to Stripe Checkout:', error);
      // Display error to your user
    }
  };

  return (
    <section id="pricing" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10 md:mb-16">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-neutral mb-12 max-w-2xl mx-auto">
          Choose the plan that's right for you. All paid plans come with a 7-day money-back guarantee.
          <br />
          <strong className="text-sm text-red-500">Note: Stripe integration is in test mode. Use test card details.</strong>
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`border rounded-lg p-8 flex flex-col ${plan.popular ? 'border-secondary ring-2 ring-secondary shadow-xl' : 'border-gray-300 shadow-lg'}`}
            >
              {plan.popular && <div className="text-center mb-4"><span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Most Popular</span></div>}
              <h3 className="text-2xl font-semibold text-neutral-dark text-center mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-primary text-center mb-1">
                {plan.price}
                {plan.priceSuffix && <span className="text-lg font-normal text-neutral">{plan.priceSuffix}</span>}
              </p>
              <p className="text-neutral text-center mb-6">Perfect for {plan.name.toLowerCase()} users.</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-neutral-dark">
                    <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => plan.priceId ? handleCheckout(plan.priceId) : (plan.name === 'Free' ? window.location.href = '#demo' : null)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 
                  ${plan.popular 
                    ? 'bg-secondary text-white hover:bg-blue-700' 
                    : (plan.priceId ? 'bg-primary text-white hover:bg-blue-800' : 'bg-neutral-light text-secondary hover:bg-gray-300')
                  }`}
                disabled={!plan.priceId && plan.name !== 'Free'} // Disable button if no priceId and not Free plan
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 text-sm text-neutral">
          <p>For enterprise solutions or custom requirements, please <a href="mailto:sales@example.com" className="text-secondary hover:underline">contact sales</a>.</p>
          <p className="mt-2">
            Remember to replace placeholder Stripe Price IDs and the publishable key with your own from your Stripe Dashboard.
            You will also need a backend to handle Checkout Session creation for robust subscription management and webhook handling.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Pricing;

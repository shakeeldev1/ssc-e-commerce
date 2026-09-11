const STEPS = [
  {
    title: 'Sign Up / Register',
    description: 'Create your account in seconds.',
  },
  {
    title: 'Shop & Browse',
    description: 'Explore our wide range of products.',
  },
  {
    title: 'Add to Cart',
    description: 'Select your favorite items and add to cart.',
  },
  {
    title: 'Secure Checkout',
    description: 'Choose your payment method and place order.',
  },
  {
    title: 'Track Your Order',
    description: 'Track your order and receive it at your door.',
  },
];

export const HowItWorks = () => (
  <section className="luxury-section">
    <div className="luxury-container">
      <p className="luxury-kicker">A considered experience</p>
      <h2 className="luxury-title mt-3">How it works</h2>
    </div>
    <div className="luxury-container mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
      {STEPS.map((step, index) => (
        <div key={step.title} className="bg-[#071019] p-7">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F7C87F] text-sm font-bold text-[#F7C87F]">
            {index + 1}
          </span>
          <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/50">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

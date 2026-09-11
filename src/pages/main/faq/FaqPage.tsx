import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Smart Card',
    items: [
      {
        question: 'How do I activate my Smart Card?',
        answer:
          'Enter your card number and email to receive a one-time code, verify it, then set a password — your card is linked to your account immediately.',
      },
      {
        question: 'What if I lose my card?',
        answer:
          'Report it lost from your account and request a replacement from your institution; your old card is blocked to prevent misuse.',
      },
    ],
  },
  {
    title: 'Student registration',
    items: [
      {
        question: 'Do I need a Smart Card to register?',
        answer:
          'No — anyone can create an account and shop. A Smart Card simply unlocks student-only pricing.',
      },
    ],
  },
  {
    title: 'Orders',
    items: [
      {
        question: 'How do I track my order?',
        answer: 'Visit "Track your order" or "My orders" from your account to see live status.',
      },
      {
        question: 'Can I cancel an order?',
        answer:
          'Orders can be cancelled before they ship. Once shipped, you can request a return once it is delivered.',
      },
    ],
  },
  {
    title: 'Payments',
    items: [
      {
        question: 'What payment methods are supported?',
        answer: 'Cash on delivery is available everywhere; online payment support is rolling out.',
      },
    ],
  },
  {
    title: 'Returns',
    items: [
      {
        question: 'How do returns and exchanges work?',
        answer:
          'Once your order is delivered, request a return or exchange from the order detail page. An admin reviews and approves it.',
      },
    ],
  },
  {
    title: 'Wholesale',
    items: [
      {
        question: 'How does wholesale pricing work?',
        answer:
          'Wholesale-eligible products have quantity-based pricing and a minimum order quantity. You can also request a custom quote (RFQ).',
      },
    ],
  },
  {
    title: 'Vendor questions',
    items: [
      {
        question: 'How do I become a vendor?',
        answer:
          'Apply from the "Sell with us" page — approval typically follows a document review.',
      },
    ],
  },
];

const FaqAccordionItem = ({ item }: { item: FaqItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left text-sm font-medium text-slate-800"
      >
        {item.question}
        <span className="ml-4 text-slate-400">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="mt-2 text-sm text-slate-500">{item.answer}</p>}
    </div>
  );
};

export const FaqPage = () => (
  <div>
    <PageHeader
      title="Frequently asked questions"
      subtitle="Quick answers about every part of the platform."
    />

    <div className="mx-auto max-w-3xl space-y-10">
      {FAQ_CATEGORIES.map((category) => (
        <section key={category.title}>
          <h2 className="mb-2 text-lg font-bold text-ink-950">{category.title}</h2>
          <div>
            {category.items.map((item) => (
              <FaqAccordionItem key={item.question} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

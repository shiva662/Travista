import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const faqItems = [
  {
    question: 'What is this website about?',
    answer:
      'This website helps users explore predefined travel itineraries based on trip duration such as weekend, short, and long trips. It also provides nearby hotels, restaurants, traditional food, and a travel diary feature.',
  },
  {
    question: 'Can I customize or create my own trip?',
    answer:
      'Currently, the platform provides only predefined travel plans. Custom trip planning will be added in future updates.',
  },
  {
    question: 'How are trips categorized?',
    answer:
      'Trips are divided into weekend trips (2-3 days), short trips (4-5 days), and long trips (6-7+ days).',
  },
  {
    question: 'How do I view hotels and restaurants?',
    answer:
      'Each trip includes a section that shows nearby hotels and restaurants for that destination.',
  },
  {
    question: 'Does this website allow hotel booking?',
    answer:
      'No, the platform only provides information about hotels and restaurants. Booking functionality is not included.',
  },
  {
    question: 'What is the travel diary feature?',
    answer:
      'The travel diary allows users to upload photos and videos of their trips and share their experiences.',
  },
  {
    question: 'Who can view my travel diary posts?',
    answer:
      'Travel diary posts can be visible to other users. Privacy settings may be added in future updates.',
  },
  {
    question: 'What is the "My Trips" section?',
    answer:
      '"My Trips" shows destinations that the user has explored or saved, acting as a personal travel history.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'Yes, an account is required to upload travel diary posts and access personal features.',
  },
  {
    question: 'Is the information updated regularly?',
    answer:
      'Predefined trips and food information are updated periodically. Nearby places may be fetched dynamically.',
  },
];

export function FAQ() {
  return (
    <div className="page-container min-h-screen py-16">
      <div className="pt-4 md:pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full glass border border-white/20 px-4 py-2.5 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="mb-12 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Click any question below to expand and view its answer.
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-3xl border border-white/10 p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-6 duration-500">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index + 1}`}
              className="border border-white/10 bg-background/30 rounded-2xl px-5 data-[state=open]:border-primary/30 transition-all"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-primary py-5">
                {index + 1}. {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm md:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

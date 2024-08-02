import React, { useState } from 'react';

type Props = {};

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ = (props: Props) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [questions, setQuestions] = useState<FAQItem[]>([
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers."
    },
    {
      question: "How can I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page."
    },
    {
      question: "Is there a free trial period?",
      answer: "Yes, we offer a 30-day free trial for new users."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings."
    },
    {
      question: "Do you offer refunds?",
      answer: "Refunds are available within the first 7 days of subscription purchase."
    }
  ]);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {questions.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-md cursor-pointer"
            onClick={() => toggleQuestion(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${activeQuestion === index ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={activeQuestion === index ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
              </svg>
            </div>
            {activeQuestion === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

import React from 'react'

type Props = {}

const FAQ = (props: Props) => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">FAQ</h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Answers to Common Questions
          </p>
        </div>
        <div className="mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is Wiser?</h3>
                <p className="text-gray-700">
                  Wiser is an innovative online platform that offers high-quality educational courses across various subjects. Our mission is to provide accessible learning opportunities to students worldwide.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I enroll in courses on Wiser?</h3>
                <p className="text-gray-700">
                  To enroll in courses on Wiser, simply browse our course catalog, select the course you{`'`}re interested in, and click the {`"`}Enroll Now{`"`} button. Follow the prompts to complete your enrollment and start learning.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is Wiser free to use?</h3>
                <p className="text-gray-700">
                  Wiser offers both free and paid courses. Some courses may require payment, while others are available at no cost. You can explore our catalog to find courses that suit your learning needs and budget.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Support</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">I{`'`}m having trouble accessing my account. What should I do?</h3>
                <p className="text-gray-700">
                  If you{`'`}re experiencing issues accessing your Wiser account, please try resetting your password using the {`"`}Forgot Password{`"`} link on the login page. For further assistance, contact our support team at support@wiser.com.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I contact Wiser{`'`}s customer support?</h3>
                <p className="text-gray-700">
                  You can reach our customer support team via email at support@wiser.com. Our team is available to assist you with any questions or concerns you may have about our platform or your learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ

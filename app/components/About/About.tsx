import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">About Wiser</h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Empowering Learners Worldwide
          </p>
        </div>
        <div className="mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At Wiser, our mission is to provide accessible, high-quality education to learners around the world. We believe that education is the key to unlocking potential and driving positive change in society.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Commitment to Excellence</li>
              <li>Innovation and Creativity</li>
              <li>Inclusivity and Diversity</li>
              <li>Student-Centered Learning</li>
              <li>Integrity and Transparency</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-gray-700">
              Wiser offers a range of features designed to enhance the learning experience:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Interactive and engaging course content</li>
              <li>Secure and easy payment methods</li>
              <li>Real-time student-teacher interactions</li>
              <li>Comprehensive analytics and performance tracking</li>
              <li>Mobile-friendly and fully responsive design</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-700">
              We are proud of the impact Wiser has had on students worldwide. Here are a few of their stories:
            </p>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-gray-700">
                  Wiser helped me ace my exams with its comprehensive courses and interactive learning methods. - <span className="font-semibold">Aditi Sharma</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-gray-700">
                  The real-time interaction with teachers was a game-changer for my learning experience. - <span className="font-semibold">Rohan Mehta</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-gray-700">
                  I loved the flexibility and accessibility that Wiser provided. It fit perfectly into my busy schedule. - <span className="font-semibold">Sara Lee</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Future Goals</h2>
            <p className="text-gray-700">
              As we look to the future, Wiser aims to expand its reach and continue innovating in the field of education. Our goals include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-4">
              <li>Launching new courses and learning paths</li>
              <li>Enhancing our platform with cutting-edge technologies</li>
              <li>Collaborating with educational institutions worldwide</li>
              <li>Creating more personalized learning experiences</li>
              <li>Fostering a global community of learners and educators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

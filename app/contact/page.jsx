import Button from '@/components/common/button';
import React from 'react';

const page = () => {
  return (
    <section className="contact container mt-10 mb-20 mx-auto" id="contact">
      <div className="mx-auto py-5 px-6 sm:px-0">
        <div className="mb-6">
          <h2 className="mb-4 font-bold text-header-2 tracking-tight text-gray-900 font-recoleta">
            Get in Touch
          </h2>
        </div>

        <div className="get-in-touch">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-gray-600">
                Have a story to tell or content to create? Whether you need a 
                ghostwriter for your book, professional content writing, or editing 
                services, our expert team is here to bring your vision to life. 
                Let's discuss your project and make your ideas shine.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-green-600 text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                      Our Office
                    </h3>
                    <p className="text-gray-600">
                      CDO Tole, Thapagaun, New Baneshwor
                      <br />
                      Kathmandu, Nepal
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-green-600 text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                      <path d="M15 7a2 2 0 0 1 2 2"></path>
                      <path d="M15 3a6 6 0 0 1 6 6"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                      Contact Information
                    </h3>
                    <p className="text-gray-600">
                      Phone: <a href='tel:+015245111' className='underline'>01 5245111</a>, <a href="tel:+9779851004761" className='underline'>9851004761</a>, <a href="tel:+9779769761738" className='underline'>9769761738</a>,
                    </p>
                    <p className="text-gray-600">Email: <a className='underline' href="mailto:ghostwriting.nepal@gmail.com">ghostwriting.nepal@gmail.com</a></p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-green-600 text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                      <path d="M12 7v5l3 3"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                      Response Time
                    </h3>
                    <p className="text-gray-600">
                      We typically respond within 24 hours
                      <br />
                      Available for consultations by appointment
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-2 md:p-5" id="form">
              <h2 className="mb-4 text-header-3 font-recoleta font-bold">Start Your Writing Project</h2>

              <div className="contact-form">
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="name"
                        autoComplete="given-name"
                        className="border border-gray-300 text-gray-900 outline-0 text-sm rounded block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="border border-gray-300 text-gray-900 outline-0 text-sm rounded block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="project-type"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Project Type
                      </label>
                      <select
                        id="project-type"
                        name="project_type"
                        className="border border-gray-300 text-gray-900 outline-0 text-sm rounded block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a service</option>
                        <option value="book-ghostwriting">Book Ghostwriting</option>
                        <option value="article-writing">Article Writing</option>
                        <option value="content-writing">Web Content Writing</option>
                        <option value="editing-proofreading">Editing & Proofreading</option>
                        <option value="research-writing">Research Writing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="textarea"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="textarea"
                      name="textarea"
                      cols={30}
                      rows={5}
                      placeholder="Tell us about your project, timeline, word count, and any specific requirements..."
                      className="border border-gray-300 text-gray-900 outline-0 text-sm rounded block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <Button color="info-green" size="small" text="Get Free Consultation" style="fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
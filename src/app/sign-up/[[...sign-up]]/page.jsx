/* eslint-disable @next/next/no-img-element */
import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <section className="bg-white">

      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          
          <img
            alt="sign up page image"
            src="https://plus.unsplash.com/premium_photo-1661295764215-aae4494822e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />

        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          
          <div className="max-w-xl lg:max-w-3xl">
            
            <a className="block text-blue-600" href="#">
              
              <span className="sr-only">Home</span>

            </a>

            <h1 className="mt-6 text-xl text-center lg:text-left font-bold text-gray-900 lgtext-4xl">
              Welcome to Ai Form Builder
            </h1>

            <p className="my-4 text-center lg:text-left leading-relaxed text-gray-500">
              Generate Quality Forms in seconds with Powerful Google Gemini API and share it across the globe.
            </p>

            <SignUp />

          </div>
        </main>
      </div>
    </section>
  );
};

export default Page;

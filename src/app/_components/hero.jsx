'use client';

import { SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


const Hero = () => {

  const { isSignedIn } = useUser();

  const router = useRouter();

  return (
    <section className="bg-gray-50">

      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">

        <div className="mx-auto max-w-xl text-center">

          <h1 className="text-3xl font-extrabold sm:text-5xl">

            Create your Form

            <strong className="font-extrabold text-primary sm:block">
              {' '}
              In Seconds with Google Gemini AI{' '}
            </strong>

          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            Generate, publish and share your form right away with AI. Dive into insightful 
            results, charts and analytics.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            {isSignedIn ? <div
              className="w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto flex items-center justify-center gap-2 hover:cursor-pointer"
              onClick={() => router.push('/dashboard')}
            >
              <span className="font-bold">+</span> <span>Create form with AI</span>
            </div> : <SignUpButton>
              <div
                className="w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto flex items-center justify-center gap-2 hover:cursor-pointer"
              >
                <span>Get Started</span>
              </div>
            </SignUpButton>}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;

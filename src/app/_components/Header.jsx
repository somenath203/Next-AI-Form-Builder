'use client';

import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { BookAIcon } from "lucide-react";


const Header = () => {

  const { isSignedIn } = useUser();

  const path = usePathname();

  return (
    <>
      {path.includes('/aiformpreview') ? <></> : <div className="p-5 border shadow-sm">

        <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between">

            <div className="flex items-center gap-2">

              <BookAIcon className="text-primary font-semibold" />

              <p className="font-bold">Next AI Form Builder</p>

            </div>

            {isSignedIn ? <div className="flex items-center gap-5">

              <Link href='/dashboard'>
                <Button variant="outline">Dashboard</Button>
              </Link>

              <UserButton />

            </div> : <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>}

        </div>

      </div>}
    </>
  )
};

export default Header;
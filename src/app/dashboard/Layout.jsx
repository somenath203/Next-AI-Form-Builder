import { Menu } from 'lucide-react';

import Sidebar from './_components/Sidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';


const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Sheet>

          <SheetTrigger asChild>

              <Button variant="outline" className='mt-10 ml-10 border-primary border'>
                <Menu className='text-primary' />
              </Button>

            </SheetTrigger>

            <SheetContent>

              <SheetHeader className='mt-8'>

                <SheetDescription>
                  <Sidebar />
                </SheetDescription>

              </SheetHeader>

            </SheetContent>

        </Sheet>
      </div>

      <div>{children}</div>
    </>
  );
};

export default Layout;

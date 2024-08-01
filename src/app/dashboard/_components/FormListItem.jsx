'use client';

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

import { Button } from "@/components/ui/button";
import { Edit2, Loader2, Share2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useState } from "react";



const FormListItem = ({ wholeFormRecord, jsonFormItem, refreshData }) => {


  const { user } = useUser();

  const [loading, setLoading] = useState();


  const onDeleteForm = async () => {

    try {

      setLoading(true);


      await db.delete(jsonForms)
              .where(and(eq(jsonForms?.id, wholeFormRecord?.id), eq(jsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)));

      toast('Form item has been deleted successfully');

      refreshData();
      
    } catch (error) {
      
      console.log(error);

    } finally {

      setLoading(false);

    }

  }


  return (
    <div className="border-2 shadow-sm rounded-lg p-4">
      
      <div className="flex items-center justify-between">

        <h2></h2>

        <AlertDialog>

          <AlertDialogTrigger asChild>

            {loading ? <Loader2 className="text-primary animate-spin duration-700 transition-all" /> : <Trash2 className="h-5 w-5 text-red-500 cursor-pointer" />}

          </AlertDialogTrigger>

          <AlertDialogContent>

            <AlertDialogHeader>

              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the item.
              </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteForm}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

        </AlertDialog>

      </div>

      <h2 className="text-lg text-black text-center">{jsonFormItem?.formTitle}</h2>

      <h2 className="text-sm text-gray-500 text-center">{jsonFormItem?.formSubheading}</h2>

      <hr className="my-4" />

      <div className="flex items-center justify-between">

      <RWebShare
        data={{
            text: `${jsonFormItem?.formSubheading}, Build your Form in Seconds with Next Ai Form Builder`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/aiformpreview/${wholeFormRecord?.id}`,
            title: jsonFormItem?.formTitle,
          }}
       >
        <Button variant='outline' size='sm' className='flex items-center justify-center gap-2 border-2 border-primary'>
            <Share2 className="h-5 w-5" /> <span>Share</span>
        </Button>
      </RWebShare>

        <Link href={`/form-create-and-edit/${wholeFormRecord?.id}`}>
          <Button size='sm' className='flex items-center justify-center gap-2'>
            <Edit2 className="h-5 w-5" /> <span>Edit</span>
          </Button>
        </Link>

      </div>

    </div>
  )
};

export default FormListItem;
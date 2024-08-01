'use client';

import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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


const FormFieldEdit = ({ defaultValue, onUpdateFormField, deleteFormField }) => {

  const [ label, setLabel ] = useState(defaultValue?.label);

  const [ placeholder, setPlaceholder ] = useState(defaultValue?.placeholder);

  return (

    <div className="flex flex-col gap-2">

      <Popover>

        <PopoverTrigger>

          <Edit className="h-5 w-5 text-gray-500" />

        </PopoverTrigger>

        <PopoverContent className='flex flex-col gap-4'>

            <h2>Edit Field</h2>

            <div className='flex flex-col gap-3'>

                <Label className='text-xs'>Label Name</Label>

                <Input 
                  type='text' 
                  defaultValue={defaultValue?.label} 
                  onChange={(e) => setLabel(e.target.value)} 
                />

            </div>

            <div className='flex flex-col gap-3'>

              <Label className='text-xs'>Placeholder Name</Label>

              <Input 
                type='text' 
                defaultValue={defaultValue?.placeholder} 
                onChange={(e) => setPlaceholder(e.target.value)} 
              />

            </div>

            <Button onClick={() => onUpdateFormField({
              label: label,
              placeholder: placeholder
            })}>Update</Button>

        </PopoverContent>

      </Popover>


      <AlertDialog>

      <AlertDialogTrigger>
        <Trash className="h-5 w-5 text-red-500" />
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently the field.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={() => deleteFormField()}>Delete</AlertDialogAction>


        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>


    </div>


  );
};

export default FormFieldEdit;

'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import { AiSession } from '@/configs/ai-model-config';
import { db } from '@/configs';
import { jsonForms } from '@/configs/schema';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from 'lucide-react';
import { toast } from "sonner"


const CreateForm = () => {

  const [ openDialogBox, setOpenDialogBox ] = useState(false);

  const [ userInput, setUserInput ] = useState('');

  const [ loading, setLoading ] = useState();

  const { user } = useUser();

  const route = useRouter();


  const PROMPT_FOR_MODEL = `
  Please generate a form in JSON format based on the following description. Ensure the output is only the JSON object without any additional text or formatting.
  
  Description: ${userInput}
  
  The JSON should include:
  - 'formTitle': The title of the form.
  - 'formSubheading': A brief description of the form's purpose.
  - 'formFields': An array of objects where each object represents a form field. Each field object should include:
    - 'label': The label of the field.
    - 'placeholder': The placeholder text for the field.
    - 'type': The type of the field (e.g., "text", "email", "tel", "password", "select").
    - 'fieldType': The field type, which could be a more specific type like "text", "number", "password", etc.
    - 'required': A boolean indicating if the field is required.
  
  Example JSON output:
  {
    "formTitle": "Your Form Title",
    "formSubheading": "Form description here",
    "formFields": [
      {
        "label": "Field Label",
        "placeholder": "Field Placeholder",
        "type": "text",
        "fieldType": "text",
        "required": true
      },
      {
        "label": "Email Address",
        "placeholder": "Enter your email address",
        "type": "email",
        "fieldType": "email",
        "required": true
      },
      {
        "label": "Phone Number",
        "placeholder": "Enter your phone number",
        "type": "tel",
        "fieldType": "tel",
        "required": false
      },
      {
        "label": "Password",
        "placeholder": "Enter your password",
        "type": "password",
        "fieldType": "password",
        "required": true
      }
    ]
  }
  
  Respond with only the JSON object.`;
  
  
  
  

  const onGenerateForm = async () => {

    try {

        if (!userInput) {

            toast('Please enter something in the textarea in order to generate image.');
    
        } else {

            setLoading(true);
    
            const response_from_model = await AiSession.sendMessage("Description"+userInput+PROMPT_FOR_MODEL);

            if(response_from_model?.response?.text()) {

                const response = await db.insert(jsonForms).values({ 

                    jsonform: response_from_model?.response?.text(),
                    createdBy: user?.primaryEmailAddress.emailAddress,
                    createdDate: moment().format('DD/MM/yyy') 
                }).returning({id: jsonForms.id});

                toast('Form generated successfully and stored in the database.');

                if (response[0].id) {

                  route.push(`form-create-and-edit/${response[0].id}`);

                }

            }

        }
        
    } catch (error) {
        
        console.log(error);

    } finally {

        setLoading(false);

    }

  }

  return (
    <>

     <Button onClick={() => setOpenDialogBox(true)}>+ Create Form</Button>

      <Dialog open={openDialogBox} onOpenChange={setOpenDialogBox}>

        <DialogContent>

          <DialogHeader className='flex flex-col gap-4'>

            <DialogTitle>Create New Form</DialogTitle>

            <DialogDescription>

                <Textarea className="resize-none" rows={10} placeholder="write a description of your form" onChange={(e) => setUserInput(e.target.value)} />

                <div className='flex items-center justify-end gap-2 mt-4'>

                    <Button variant='destructive' disabled={loading} onClick={() => setOpenDialogBox(false)}>Cancel</Button>

                    <Button onClick={onGenerateForm} disabled={loading}>
                      { loading ? <LoaderIcon className='transition-all animate-spin duration-1000' /> : <span>Create</span> }
                    </Button>

                </div>

                <div className='mt-4 text-center p-5 bg-yellow-100'>
                  <p className='text-black font-semibold'>Make sure your prompt is clear and detailed to ensure accurate responses from the AI. If the prompt is not well-written or lacks detail, the AI may produce inaccurate or incomplete outputs.</p>
                </div>

            </DialogDescription>

          </DialogHeader>

        </DialogContent>

      </Dialog>
    </>
  );
};

export default CreateForm;

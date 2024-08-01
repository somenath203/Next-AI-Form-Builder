/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, SquareArrowUpRight, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";


import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import FormUI from "../_components/FormUI";
import Controllers from "../_components/Controllers";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Page = ({ params }) => {

  
  const { user } = useUser();

  const [ jsonFormDb, setJsonFormDb ] = useState();

  const [ wholeRecord, setWholeRecord ] = useState();

  const router = useRouter();

  const [ triggerUpdateOfFormField, setTriggerUpdateOfFormField ] = useState();

  const [ selectedTheme, setSelectedTheme ] = useState('light');

  const [ selectedBackgroundTheme, setSelectedBackgroundTheme ] = useState('White');


  const [ loadingData, setLoadingData ] = useState();

  const [ loadingUpdateData, setLoadingUpdateData ] = useState();


  const getFormDataOfTheIDInTheURL = async () => {

    try {

      setLoadingData(true);
      
      const result = await db.select()
                             .from(jsonForms)
                             .where(and(eq(jsonForms?.id, params?.formId), eq(jsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)));

      const form = result[0];

      setWholeRecord(form);

      setJsonFormDb(JSON.parse(form.jsonform));

      setSelectedTheme(form.theme || 'light');

      setSelectedBackgroundTheme(form.background || 'White');

    } catch (error) {
      
      console.log(error);

      toast('Something went wrong, please try again.');

    } finally {

      setLoadingData(true);

    }

  }

  useEffect(() => {

    user && getFormDataOfTheIDInTheURL();
  
  }, [user]);


  const onUpdateFormFieldFuncUpdate = (value, index) => {

    jsonFormDb.formFields[index].label = value.label;

    jsonFormDb.formFields[index].placeholder = value.placeholder;

    setTriggerUpdateOfFormField(Date.now()); 

  }


  const updateJsonFormInDB = async () => {

    try {

      setLoadingUpdateData(true);
      
      await db.update(jsonForms).set({
        jsonform: jsonFormDb
      }).where(and(eq(jsonForms?.id, params?.formId), eq(jsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)));

      toast("field has been updated successfully");

    } catch (error) {
      
      toast('Something went wrong, please try again.');

      console.log(error);

    } finally {

      setLoadingUpdateData(false);

    }

  }

  useEffect(() => {

    if(triggerUpdateOfFormField) {

      setJsonFormDb(jsonFormDb);

      updateJsonFormInDB();

    }

  },[triggerUpdateOfFormField]);

  
  const deleteFieldFuncFromUIAndDB = (indexOfTheFieldToBeRemoved) => {

    try {

      const fieldsAfterDeletingTheTargetField = jsonFormDb?.formFields?.filter((_, index) => index !== indexOfTheFieldToBeRemoved);

      jsonFormDb.formFields = fieldsAfterDeletingTheTargetField;

      setTriggerUpdateOfFormField(Date.now()); 

      toast("field has been deleted successfully");


    } catch (error) {

      console.log("Error:", error);
      
    }
  };

  const updateThemeControllerField = async (value, columnName) => {

    try {
      
      await db.update(jsonForms).set({
        [columnName]: value
      }).where(and(eq(jsonForms?.id, params?.formId), eq(jsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)));
  
      toast("field has been updated successfully");

    } catch (error) {
      
      console.log(error);

    } 

  }

  const updateBackgroundControllerField = async (value, columnName) => {

    try {

      await db.update(jsonForms).set({
        [columnName]: value
      }).where(and(eq(jsonForms?.id, params?.formId), eq(jsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)));
  
      toast("field has been updated successfully");
      
    } catch (error) {
      
      console.log(error);

    } 

  }


  return (
    <div className="p-10">

      <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-4">


        <h2 
          className="flex gap-2 items-center my-5 hover:cursor-pointer hover:font-bold transition-all"
          onClick={() => router.push('/dashboard')}
        >

          <ArrowLeft /> Back

        </h2>


        <div className="flex items-center gap-2 lg:gap-4">

          <Link href={`/aiformpreview/${params?.formId}`} target="_blank">

            <Button 
              variant='outline' 
              className='flex items-center gap-2 border-2 border-primary'
            > <SquareArrowUpRight /> <span>Live Preview</span> 
            </Button>

          </Link>

          <RWebShare
            data={{
              text: `${wholeRecord?.formSubheading}, Build your Form in Seconds with Next Ai Form Builder`,
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/aiformpreview/${wholeRecord?.id}`,
              title: wholeRecord?.formTitle,
            }}
          >
            <Button 
              className='flex items-center gap-2'
            > <span><Share2 /></span> <span>Share</span> 
            </Button>
          </RWebShare>

        </div>


      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="p-5 border rounded-lg shadow-md">
          
          <Controllers 
            setSelectedTheme={(value) => {

              setSelectedTheme(value);

              updateThemeControllerField(value, 'theme');

            }} 
            setSelectedBackgroundTheme={(value) => {

              setSelectedBackgroundTheme(value);

              updateBackgroundControllerField(value, 'background');

            }}

            selectedTheme={selectedTheme}

            selectedBackground={selectedBackgroundTheme}
            
          />
          
        </div>

        <div className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center" style={{ backgroundImage: selectedBackgroundTheme }}>
          
          <FormUI 
            jsonFormProp={jsonFormDb} 
            onUpdateFormFieldFunc={onUpdateFormFieldFuncUpdate} 
            deleteFieldFunc={(index) => deleteFieldFuncFromUIAndDB(index)}
            selectedTheme={selectedTheme}
            selectedBackgroundTheme={selectedBackgroundTheme}
            loadingData={loadingData}
            loadingUpdateData={loadingUpdateData}
          />

        </div>

      </div>

    </div>
  )

};

export default Page
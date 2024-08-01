'use client';

import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";

import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import FormListItem from "./FormListItem";
import { Loader2 } from "lucide-react";


const FormList = () => {

  const { user } = useUser([]);

  const [ loading, setLoading ] = useState();

  const [ listOfForms, setListOfForms ] = useState();

  const getFormList = async () => {

    try {

        setLoading(true);
        
        const allForms = await db.select()
                                 .from(jsonForms)
                                 .where(eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
                                 .orderBy(desc(jsonForms.id)) // sort the result in descending order wrt ID of the column

        setListOfForms(allForms);

    } catch (error) {
        
        console.log(error);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {
    user && getFormList()
  }, [user]);


  return (
    loading ? <div className="flex items-center justify-center mt-20">

      <div className="h-10 w-10">

        <Loader2 className="h-full w-full text-primary animate-spin transition-all duration-500" />
        
      </div>

    </div> : <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listOfForms && listOfForms?.map((form, index) => (
            <div key={index}>

                <FormListItem 
                  wholeFormRecord={form}
                  jsonFormItem={JSON.parse(form?.jsonform)} 
                  refreshData={getFormList}
                />

            </div>
        ))}
    </div>
  )
}

export default FormList;
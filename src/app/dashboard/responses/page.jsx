'use client';

import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { db } from "@/configs";
import Layout from "../Layout";
import { jsonForms } from "@/configs/schema";
import FormResponseListItem from "./_components/FormResponseListItem";


const Page = () => {

  
  const { user } = useUser();

  const [ loading, setLoading ] = useState();

  const [ wholeRecord, setWholeRecord ] = useState();


  const getFormList = async () => {

    try {

        setLoading(true);

        const result = await db
                             .select()
                             .from(jsonForms)
                             .where(eq(jsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress));

        
        setWholeRecord(result);
        
    } catch (error) {
        
        console.log(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    user && getFormList();

  }, [user]);


  return (
    <Layout>

        <div className="p-10">

            <h2 className='font-bold text-xl lg:text-2xl text-center lg:text-left'>Responses</h2>

            {loading ? <div className="flex justify-center items-center mt-20">

              <div className="w-10 h-10">

                <Loader2 className="h-full w-full text-primary animate-spin transition-all duration-500" />
              
              </div>

            </div> : wholeRecord?.length === 0 ? <div className="flex items-center justify-center mt-24 text-center">
              <p className="text-xl lg:text-2xl text-primary tracking-wider">No Records Found</p>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {wholeRecord?.map((record, index) => (

                    <div key={index}>

                        <FormResponseListItem 
                            jsonForm={JSON.parse(record?.jsonform)} 
                            formRecord={record} 
                        />

                    </div>

                ))}
            </div>}

        </div>

    </Layout>
  )
};

export default Page;
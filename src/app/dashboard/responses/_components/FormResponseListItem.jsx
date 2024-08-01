'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { db } from '@/configs';
import { userResponseViaForm } from '@/configs/schema';
import { eq, count } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';


const FormResponseListItem = ({ jsonForm, formRecord }) => {


  const [loading, setLoading] = useState();

  const [loadingTotalCounts, setLoadingTotalCounts] = useState();

  const [ totalumberOfRecords, setTotalNumberOfRecords ] = useState(0);


  const getTotalNumberOfRecords = async () => {

    try {

      setLoadingTotalCounts(true);

      const totalCountResult = await db.select({ total: count() })
                                     .from(userResponseViaForm)
                                     .where(eq(userResponseViaForm.referenceOfTheFormWhichUserUsedToSubmitResponse, formRecord.id));

      setTotalNumberOfRecords(totalCountResult[0]?.total || 0);
      
    } catch (error) {
      
      console.log(error);

    } finally {

      setLoadingTotalCounts(false);

    }

  }


  useEffect(() => {

    getTotalNumberOfRecords();
  
  }, []);
  

  const exportData = async () => {

    try {

      let allJsonData = [];

      setLoading(true);

      const result = await db.select()
                             .from(userResponseViaForm)
                             .where(eq(userResponseViaForm?.referenceOfTheFormWhichUserUsedToSubmitResponse, formRecord?.id));

      
      result?.forEach((item) => {

        const jsonItem = JSON.parse(item?.jsonResponse);

        allJsonData.push(jsonItem);

      });

      exportJsonToExcel(allJsonData);
      
    } catch (error) {
      
      console.log(error);

    } finally {

      setLoading(false);

    }

  }


  const exportJsonToExcel = (jsonData) => {

    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");

    XLSX.writeFile(workbook, `${jsonForm?.formTitle}.xlsx`);

  }


  return (
    <div className="border-2 shadow-sm rounded-lg p-4 my-5">

      <h2 className="text-lg text-black text-center">
        {jsonForm?.formTitle}
      </h2>

      <h2 className="text-sm text-gray-500 text-center">
        {jsonForm?.formSubheading}
      </h2>

      <hr className="my-4" />

      <div className="flex justify-between items-center">

        <h2 className='text-sm'> {loadingTotalCounts ? <span>Loading...</span> : <><span>Total Response:</span> <strong>{totalumberOfRecords}</strong></>} </h2>

        <Button className='' disabled={loading} size='sm' onClick={exportData}>{loading ? <Loader2 className='transition-all animate-spin duration-700' /> : <span>Export</span>}</Button>

      </div>

    </div>
  );
};

export default FormResponseListItem;

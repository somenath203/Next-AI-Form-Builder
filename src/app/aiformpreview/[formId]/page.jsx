'use client';

import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';
import { Loader, Loader2 } from 'lucide-react';

import { db } from '@/configs';
import { jsonForms, userResponseViaForm } from '@/configs/schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';


const Page = ({ params }) => {

  const [jsonForm, setJsonForm] = useState();

  const [theme, setTheme] = useState();

  const [background, setBackground] = useState();

  const [formData, setFormData] = useState({});

  const [ loading, setLoading ] = useState();

  const [ loadingWholeForm, setLoadingWholeForm ] = useState();


  const getFormDataUsingFormIdComingFromParams = async () => {

    try {

      setLoadingWholeForm(true);

      const result = await db
        .select()
        .from(jsonForms)
        .where(eq(jsonForms?.id, params?.formId));

      setJsonForm(JSON.parse(result[0]?.jsonform));

      setTheme(result[0]?.theme);

      setBackground(result[0]?.background);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    getFormDataUsingFormIdComingFromParams();
  }, [params]);



  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));  

  };

  const handleSelectChange = (name, value) => {

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  const handleRadioChange = (name, value) => {

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };


  const handleCheckBoxChange = (fieldName, itemName, value) => {


    const listOfCheckBox = formData?.[fieldName] ?  formData?.[fieldName] : [];

    if (value !== undefined) {

        listOfCheckBox.push({
            label: itemName,
            value: value
        });

        setFormData({
            ...formData,
            [fieldName]: listOfCheckBox
        })

    } else {

        setFormData({
            ...formData,
            [fieldName]: itemName,
        })

    }

  };
  

  const onFormSubmit = async (e) => {

    try {
      
      e.preventDefault();

      setLoading(true);

      console.log(formData);

      const result = await db.insert(userResponseViaForm)
                             .values({
                              jsonResponse: formData,
                              createdDate: moment().format('DD/MM/yyy'),
                              referenceOfTheFormWhichUserUsedToSubmitResponse: parseInt(params?.formId, 10)
                            });

      
      if (result) {

        toast('form submitted successfully');

      } else {

        toast('something went wrong or not all the fields were filled properly');

      }

    } catch (error) {

      toast('something went wrong or not all the fields were filled properly');
      
      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      {loadingWholeForm ? jsonForm && (
        <div
          className="p-4 min-h-screen flex items-center justify-center overflow-y-auto"
          style={{ backgroundImage: background }}
        >
          <form
            className="p-5 border md:w-[600px] rounded-lg"
            data-theme={theme}
            onSubmit={onFormSubmit}
          >

            <h2 className="font-bold text-center text-2xl">

              {jsonForm?.formTitle}

            </h2>

            <h2 className="text-sm text-gray-400 text-center">

              {jsonForm?.formSubheading}

            </h2>

            {jsonForm?.formFields?.map((field, index) => (

              <div key={field?.label} className="w-full flex items-center gap-3">

                <div className="my-3 w-full">

                  {field?.fieldType === 'select' ? (
                    <>

                      <Label className="text-xs text-gray-500">
                        {field?.label}
                      </Label>

                      <Select
                        required={field?.required}
                        onValueChange={(value) =>
                          handleSelectChange(field?.label, value)
                        }
                      >
                        <SelectTrigger className="w-full bg-transparent">

                          <SelectValue placeholder={field?.placeholder} />

                        </SelectTrigger>

                        <SelectContent>

                          {field?.options?.map((f, index) => (
                            <SelectItem value={f?.value} key={index}>
                              {f?.label}
                            </SelectItem>
                          ))}

                        </SelectContent>

                      </Select>
                    </>
                  ) : field?.fieldType === 'radio' ? (

                    <div
                      className={`flex ${
                        field?.options && 'flex-col'
                      } gap-2 w-full`}
                    >
                      <Label className="text-xs text-gray-500">
                        {field?.label}
                      </Label>

                      <RadioGroup
                        required={field?.required}
                        onValueChange={(value) =>
                          handleRadioChange(field?.label, value)
                        }
                      >
                        {field?.options.map((item, index) => (
                          
                          <div
                            className="flex items-center space-x-2"
                            key={index}
                          >
                            <RadioGroupItem
                              value={item?.value}
                              id={item?.value}
                              name={field?.label}
                            />
                            <Label htmlFor={item?.value}>{item?.label}</Label>

                          </div>

                        ))}
                      </RadioGroup>

                    </div>

                  ) : field?.fieldType === 'checkbox' ? (

                    <div className="flex flex-col gap-2 w-full">

                      <Label>{field?.label}</Label>

                      {field?.options ? (

                        field?.options?.map((item, index) => (

                          <div key={index} className="flex gap-2 items-center">

                            <Checkbox
                                name={field?.label}
                                onCheckedChange={(value) =>
                                    handleCheckBoxChange(
                                     field?.label,
                                     item?.label,
                                     value
                                    )
                                }
                                required={field?.required}
                            />

                            <h2>{item?.label}</h2>

                          </div>

                        ))
                      ) : (

                        <Checkbox
                            name={field?.label}
                            onCheckedChange={(value) =>
                                handleCheckBoxChange(
                                 field?.label,
                                 value
                                )
                            }
                            required={field?.required}
                        />

                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 w-full">

                      <Label className="text-xs text-gray-500">

                        {field?.label}

                      </Label>

                      <Input
                        type={field?.type}
                        placeholder={field?.placeholder}
                        name={field?.label}
                        className="bg-transparent"
                        onChange={(e) => handleInputChange(e)}
                        required={field?.required}
                      />

                    </div>
                  )}
                </div>

              </div>

            ))}

            {loading ? <div className="h-8 w-8 m-auto mt-2">

              <Loader className='h-full w-full transition-all animate-spin duration-1000' />

            </div> : <button
              type="submit"
              className="btn btn-primary w-full rounded-lg mt-4"
            >
              Submit
            </button>}

          </form>

        </div>
      ) : <div className='min-h-screen flex items-center justify-center'>

        <div className="w-10 h-10">

          <Loader2 className='h-full w-full text-primary transition-all animate-spin duration-700' />

        </div>

      </div>}
    </>
  );
};

export default Page;

'use client';

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox"
import FormFieldEdit from "./FormFieldEdit";


const FormUI = ({ jsonFormProp, onUpdateFormFieldFunc, deleteFieldFunc, selectedTheme, loadingData, loadingUpdateData }) => {


  const [ formData, setFormData ] = useState();
 
  
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  }

  const onFormSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

  }

  return (

    loadingData || loadingUpdateData ? <form className="p-5 border md:w-[600px] rounded-lg" data-theme={selectedTheme} onSubmit={onFormSubmit}>

      <h2 className="font-bold text-center text-2xl">{jsonFormProp?.formTitle}</h2>

      <h2 className="text-sm text-gray-400 text-center">{jsonFormProp?.formSubheading}</h2>

      {jsonFormProp?.formFields?.map((field, index) => (

        <div key={field?.label} className="w-full flex items-center gap-3">

          <div className="my-3 w-full">

            {field?.fieldType === 'select' ? (
              <>

                <Label className='text-xs text-gray-500'>{field?.label}</Label>

                <Select required={field?.required}>

                  <SelectTrigger className="w-full bg-transparent">

                    <SelectValue placeholder={field?.placeholder} />

                  </SelectTrigger>

                  <SelectContent>

                    {field?.options?.map((f, index) => (
                      <SelectItem value={f?.value} key={index}>{f?.label}</SelectItem>
                    ))}

                  </SelectContent>

                </Select>

              </>
            ) : field?.fieldType === 'radio' ? (
              <div className={`flex ${field?.options && 'flex-col'} gap-2 w-full`}>

                <Label className='text-xs text-gray-500'>{field?.label}</Label>

                <RadioGroup required={field?.required}>

                  {field?.options.map((item, index) => (

                    <div className="flex items-center space-x-2" key={index}>

                      <RadioGroupItem value={item?.value} id={item?.value} />

                      <Label htmlFor={item?.value}>{item?.label}</Label>

                    </div>

                  ))}

                </RadioGroup>

              </div>
            ) : field?.fieldType === 'checkbox' ? (

              <div className="flex flex-col gap-2 w-full">

                <Label>{field?.label}</Label>

                {field?.options ? field?.options?.map((item, index) => (

                  <div key={index} className="flex gap-2 items-center">

                    <Checkbox
                      onChange={(e) => handleInputChange(e)}
                      required={field?.required} 
                    />

                    <h2>{item?.label}</h2>

                  </div>

                )) : <>

                  <Checkbox required={field?.required} />

                </>}
                
              </div>

            ) : (
              <div className="flex flex-col gap-2 w-full">

                <Label className='text-xs text-gray-500'>{field?.label}</Label>

                <Input 
                  type={field?.type} 
                  placeholder={field?.placeholder} 
                  name={field?.label} 
                  className='bg-transparent'
                  onChange={(e) => handleInputChange(e)}
                  required={field?.required}
                />

              </div>
            )}

          </div>


          <div>

            <FormFieldEdit 
              defaultValue={field} 
              onUpdateFormField={(valuesFromFromFIeldComponent) => onUpdateFormFieldFunc(valuesFromFromFIeldComponent, index)} 
              deleteFormField={() => deleteFieldFunc(index)}
            />

          </div>

        </div>
        
      ))}

      <div className="btn btn-primary w-full rounded-lg mt-4">Submit</div>
    
    </form> : <>
      <div className="flex items-center justify-center">

        <div className="w-10 h-10">
          
          <Loader2 className="h-full w-full text-primary animate-spin transition-all duration-500" />
        
        </div>

      </div>
    </>
  )
};

export default FormUI;

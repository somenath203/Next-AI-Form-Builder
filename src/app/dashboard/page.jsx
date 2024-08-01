import Layout from './Layout';
import CreateForm from './_components/CreateForm';
import FormList from './_components/FormList';

const Page = () => {
  return (
    <Layout>

      <div className='p-10'>

        <h2 className='font-bold text-xl lg:text-2xl flex flex-col gap-4 lg:gap-4 lg:flex-row items-center lg:justify-between'>
        
          <span>Dashboard</span>

          <CreateForm />
        
        </h2>

        <FormList />

      </div>

    </Layout>
  )
};

export default Page;
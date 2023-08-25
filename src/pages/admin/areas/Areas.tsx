import CreateNewDistrict from './create-new-district';
import ListDistricts from './list-districts';

const Areas = () => {
  return (
    <>
      <div className='py-1'>
        <CreateNewDistrict />
      </div>
      <div className='py-1'>
        <ListDistricts />
      </div>
    </>
  );
};

export default Areas;

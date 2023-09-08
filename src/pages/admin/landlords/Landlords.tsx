import CreateNewStaff from './create-new-landlord';
import ListStaffs from './list-landlords';

const Staffs = () => {
  return (
    <>
      <div className='py-1'>
        <CreateNewStaff />
      </div>
      <div className='py-1'>
        <ListStaffs />
      </div>
    </>
  );
};

export default Staffs;

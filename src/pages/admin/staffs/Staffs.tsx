import CreateNewStaff from './create-new-staff';
import ListStaffs from './list-staffs';

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

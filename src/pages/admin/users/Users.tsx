import CreateNewStaff from './create-new-staff';
import ListUsers from './list-users';

const Users = () => {
  return (
    <>
      <div className='py-1'>
        <CreateNewStaff />
      </div>
      <div className='py-1'>
        <ListUsers />
      </div>
    </>
  );
};

export default Users;

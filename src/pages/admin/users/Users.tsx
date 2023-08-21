import CreateNewUser from './create-new-user';
import ListUsers from './list-users';

const Users = () => {
  return (
    <>
      <div className='py-1'>
        <CreateNewUser />
      </div>
      <div className='py-1'>
        <ListUsers />
      </div>
    </>
  );
};

export default Users;

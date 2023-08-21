import CreateNewBranch from './create-new-branch';
import ListBranches from './list-branches';

const Branches = () => {
  return (
    <>
      <div className='py-1'>
        <CreateNewBranch />
      </div>
      <div className='py-1'>
        <ListBranches />
      </div>
    </>
  );
};

export default Branches;

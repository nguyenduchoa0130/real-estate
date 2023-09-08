import CreateNewHouse from './create-new-house';
import ListHouses from './list-houses';

const MyHouses = () => {
  return (
    <>
      <div className='p-5'>
        <div className='py-1'>
          <CreateNewHouse />
        </div>
        <div className='py-1'>
          <ListHouses />
        </div>
      </div>
    </>
  );
};

export default MyHouses;

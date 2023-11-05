
import Box_earn from './Box_earn';
import Box_get from './Box_get';

const SubHero = () => {
  return (
<div className='grid grid-cols-12 mt-12'>

        <div className='grid col-start-1 col-span-5'>
        <div className="hover:shadow-xl">
            <Box_earn/>
        </div>
        </div>
        <div className='grid col-start-7 col-span-5'>
        <div className="hover:shadow-xl">
            <Box_get/>
        </div>
        </div>
</div>
  );
};

export default SubHero;

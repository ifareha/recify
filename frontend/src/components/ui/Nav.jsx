
import { Button } from './button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '@/store/reducer/authSlice';
import { store } from '@/store/store';
import FilterCard from './FilterCard';

const Nav = () => {
const {user} = useSelector((store) => store.auth)
  return (
    <div className='w-[15%] bg-zinc-200 h-full p-7 sticky top-0 '>
        <Button>Recify</Button>
        <div className='mt-8 flex flex-col gap-5 font-semibold text-lg'>
        <Link to="/" >Home</Link>
      {
        user && (
          <Link to="favorite" >Favorite</Link>
        ) 
      }
      {
        user && (
          <Link to="create" >Add New Recipe</Link>
        ) 
      }
       
        </div>
    
        <div className='mt-8'>
            <FilterCard/>
        </div>
    </div>
  )
}

export default Nav
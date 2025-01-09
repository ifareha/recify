
import Nav from '@/components/ui/Nav'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex bg-zinc-200 w-full h-screen'>
        <Nav />
        <div className='w-full h-screen'>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout
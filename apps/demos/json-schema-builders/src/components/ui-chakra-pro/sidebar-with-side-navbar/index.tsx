import { MobileNavbar } from './mobile-navbar'
import { Sidebar } from './sidebar'

const Index = () => {
  return (
    <>
      <MobileNavbar hideFrom="md" />
      <Sidebar hideBelow="md" />
    </>
  )
}
export default Index

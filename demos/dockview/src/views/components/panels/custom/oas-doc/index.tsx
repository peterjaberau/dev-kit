import OasDoc from '#modules/oas/doc'
import { data } from '#modules/oas/data/petstore'

const Index = (props: any) => {

  return <OasDoc apiSpec={data} />
}
export default Index

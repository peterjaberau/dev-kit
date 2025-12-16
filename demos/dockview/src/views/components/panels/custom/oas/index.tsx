import OasApp from '#modules/oas/index'
import { data } from '#modules/oas/data/sample-api-specs'

const Index = (props: any) => {

  return <OasApp apiSpec={data} />
}
export default Index

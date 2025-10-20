import { MantineThemeDecorator } from "../MantineThemeDecorator"
import { JsonForm } from '#json-editor-widgets';


const Index = () => {

  return (
    <MantineThemeDecorator>
      <JsonForm
        data={[
          'a title',
          'a subtitle'
        ]}
        schema={{
          items: [
            {
              title: 'Title',
              type: 'string'
            },
            {
              title: 'Subtitle',
              type: 'string'
            }
          ],
          title: 'items: [schema, schema]',
          type: 'array'
        }}
        validate
      />

    </MantineThemeDecorator>
  )
}

export default Index

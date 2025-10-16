import { Button, Card, Field, Input, Tabs } from '@chakra-ui/react'

const Index = () => {
  return (
    <Card.Root variant="elevated" boxShadow="lg">
      <Tabs.Root defaultValue="login" size="sm" variant="line">
        <Tabs.List mx="6" pt="2">
          <Tabs.Trigger value="login" flex="1" justifyContent="center">
            Login
          </Tabs.Trigger>
          <Tabs.Trigger value="register" flex="1" justifyContent="center">
            Register
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="login">
          <Card.Header>
            <Card.Title>Welcome to Chakra UI</Card.Title>
            <Card.Description>Enter your credentials to login to your account.</Card.Description>
          </Card.Header>
          <Card.Body gap="4">
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input defaultValue="grizzly_codes" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input type="password" placeholder="*****" />
            </Field.Root>
          </Card.Body>
          <Card.Footer>
            <Button width="full">Login</Button>
          </Card.Footer>
        </Tabs.Content>
        <Tabs.Content value="register">
          <Card.Header>
            <Card.Title>Create an account</Card.Title>
            <Card.Description>
              Please fill out the form below to create an account.
            </Card.Description>
          </Card.Header>
          <Card.Body gap="4">
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input type="text" />
            </Field.Root>
            <Field.Root>
              <Field.Label>E-Mail</Field.Label>
              <Input type="email" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input type="password" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <Input type="password" />
            </Field.Root>
          </Card.Body>
          <Card.Footer>
            <Button width="full">Create Account</Button>
          </Card.Footer>
        </Tabs.Content>
      </Tabs.Root>
    </Card.Root>
  )
}
export default Index

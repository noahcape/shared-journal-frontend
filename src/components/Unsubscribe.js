import React from 'react';
import { useDispatch} from 'react-redux';
import { unsubscribeUser } from '../store/actions/settingsActions';
import { Form, Input, Button, Typography } from "antd"

const { Text, Title } = Typography

const Unsubscribe = (props) => {
  const dispatch = useDispatch()
  const [email, setEmail] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState('')

  const parseError = (error) => {
    switch (error) {
      case ('email/not/found'):
        setError('Please input a valid email')
        break;
      case ('unknown/journal'):
        setError('We could not find the journal you were trying to unsubscribe from')
        break;
      case ('not/subscribed'):
        setError('This email is not subscribed')
          break;
      default:
        setError('Network issue try again later')
    }
  }

  const submitUnsubscribe = () => {
    setError('')
    setSuccess(false)
    dispatch(unsubscribeUser(props.match.params.journalName, email))
      .then(() => setSuccess(true))
      .catch((error) => {
        error.response && parseError(error.response.data)
      })
  }

  return (
    <div style={{margin: 'auto', alignContent: 'center'}}>
      <Title style={{ textAlign: 'center' }}>Confirm Email to Unsubscribe from {props.match.params.journalName.split("_").join(" ")}</Title>
      <div style={{width: 500, margin: 'auto', alignContent: 'center'}}>
        <Form {...layout}>
          <Form.Item label={<Text>Email</Text>}>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' onClick={submitUnsubscribe}>Unsubscribe</Button>
          </Form.Item>
        </Form>
        <Text>{error}</Text>
        {success && <Text>Success!</Text>}
      </div>
    </div>
  );
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export default Unsubscribe;
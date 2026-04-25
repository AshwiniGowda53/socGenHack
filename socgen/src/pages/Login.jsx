import { Form, Input, Button, Card, Typography, message } from "antd"
import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { validateCustomerId } from "../utils/validation"

const { Title } = Typography

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    if (!validateCustomerId(values.customerId)) {
      return message.error("Customer ID must start with 5/6 and be 9 digits")
    }

    try {
      await login(values.customerId, values.password)
      navigate("/dashboard")
    } catch {
      message.error("Invalid Credentials")
    }
  }

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3}>Bank Login</Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Customer ID" name="customerId" required>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" required>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1d2671, #c33764)"
  },
  card: {
    width: 350,
    borderRadius: 12
  }
}

export default Login
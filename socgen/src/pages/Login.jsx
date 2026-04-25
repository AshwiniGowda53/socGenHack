import { Card, Typography, Input, Button } from "antd"
import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { loginSchema } from "../utils/validationSchema"

const { Title } = Typography

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      customerId: "",
      password: ""
    },
    validationSchema: loginSchema,

    validateOnChange: false,  // ❌ no validation while typing
    validateOnBlur: true,     // ✅ validate on blur

    onSubmit: async (values, { setErrors }) => {
      try {
        await login(values.customerId, values.password)
        navigate("/dashboard")
      } catch {
        setErrors({ password: "Invalid credentials" })
      }
    }
  })

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3}>Bank Login</Title>

        <form onSubmit={formik.handleSubmit}>

          {/* Customer ID */}
          <div style={styles.field}>
            <label>Customer ID</label>
            <Input
              name="customerId"
              value={formik.values.customerId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={9}
              status={
                (formik.touched.customerId || formik.submitCount > 0) &&
                formik.errors.customerId
                  ? "error"
                  : ""
              }
            />

            {(formik.touched.customerId || formik.submitCount > 0) &&
              formik.errors.customerId && (
                <div style={styles.error}>
                  {formik.errors.customerId}
                </div>
              )}
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label>Password</label>
            <Input.Password
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={
                (formik.touched.password || formik.submitCount > 0) &&
                formik.errors.password
                  ? "error"
                  : ""
              }
            />

            {(formik.touched.password || formik.submitCount > 0) &&
              formik.errors.password && (
                <div style={styles.error}>
                  {formik.errors.password}
                </div>
              )}
          </div>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

        </form>
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
  },
  field: {
    marginBottom: "16px"
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px"
  }
}

export default Login
import { useAuth } from "../auth/AuthContext"
import { Button, Typography } from "antd"
import { useNavigate } from "react-router-dom"

const { Title } = Typography

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()          // clears tokens
    navigate("/")     // redirect to login
  }

  return (
    <div style={styles.container}>

      {/* Header */}
      <header style={styles.header}>
        <Title level={4} style={styles.title}>
          Welcome {user?.name} 👋
        </Title>

        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </header>

      {/* Content */}
      <main style={styles.content}>
        <div style={styles.placeholder}>
          🚀 Your features will go here
        </div>
      </main>

    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #1d2671, #c33764)",
    display: "flex",
    flexDirection: "column"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px"
  },

  title: {
    color: "#fff",
    margin: 0
  },

  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  placeholder: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    fontSize: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  }
}

export default Dashboard
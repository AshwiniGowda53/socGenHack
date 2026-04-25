import { useAuth } from "../auth/AuthContext"
import { Button, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import Favorite from "../components/Favorite"

const { Title } = Typography

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
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
        <Favorite />
      </main>

    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1d2671, #c33764)",
    display: "flex",
    flexDirection: "column"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backdropFilter: "blur(8px)",
    background: "rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.15)"
  },

  title: {
    color: "#fff",
    margin: 0,
    fontWeight: 600
  },

  content: {
    flex: 1,
    padding: "16px",
    overflow: "auto"
  }
}

export default Dashboard
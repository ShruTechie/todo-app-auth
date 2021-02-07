import React, { useState } from "react"
import { Card, Button, Alert, Input } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Todo from './Todo'


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Todo - app</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Welcome:</strong> {currentUser.email}
          <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
          {/* <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
          <Todo/>
             
            

        </Card.Body>
      </Card>
      {/* <div className="w-100 text-center mt-2">
      
      </div> */}

    </>
  )
}
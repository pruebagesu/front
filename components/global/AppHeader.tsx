import { Avatar, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import useAuth from "hooks/useAuth"
import IconFA from "components/ui/icons/IconFA"

const AppHeader = () => {
  const { user, setUser } = useAuth()

  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/login")
  }
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={8}>
      <Avatar src="/logo.png" />
      {!user && (
        <Button
          colorScheme="blue"
          mb={2}
          alignSelf="end"
          onClick={() => {
            router.push("/login")
          }}
        >
          Iniciar sesión
        </Button>
      )}
      {!!user && (
        <IconFA
          icon="fa-solid fa-right-from-bracket"
          title="Cerrar sesión"
          className="cursorp fs12 mr2"
          hovColor="red"
          onClick={logout}
        />
      )}
    </Flex>
  )
}

export default AppHeader

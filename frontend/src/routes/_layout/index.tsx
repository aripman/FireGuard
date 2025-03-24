import { Box, Container, Text, Input } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <Container maxW="full" centerContent>
        <Box pt={12} m={4} textAlign="center">
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
        <Box w="100%" display="flex" justifyContent="center" mt={4}>
          <Input
            placeholder="Search..."
            width="50%"
            maxWidth="600px"
            borderRadius="xl"
            boxShadow="md"
            p={4}
          />
        </Box>

      </Container>
    </>
  );
}

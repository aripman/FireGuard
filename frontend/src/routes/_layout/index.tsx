import { Box, Container, Text, Input } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { OpenAPI } from "../../client"
import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [result, setResult] = useState<any>(null)

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.length > 2) {  // Only search if query is longer than 2 characters
      try {
        const response = await fetch(`${OpenAPI.BASE}/api/v1/geonorge/${encodeURIComponent(query)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setResult(data)
        console.log("API Response:", data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  }

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
            placeholder="Search location..."
            width="50%"
            maxWidth="600px"
            borderRadius="xl"
            boxShadow="md"
            p={4}
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>
        {result && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text>Kommune: {result.kommune}</Text>
            <Text>Latitude: {result.latitude}</Text>
            <Text>Longitude: {result.longitude}</Text>
          </Box>
        )}
      </Container>
    </>
  );
}

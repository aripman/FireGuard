import { OpenAPI } from "../../client"
import { Box, Container, Text, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"

// Definerer typen for fireRisks
interface FireRisk {
  timestamp: string;
  ttf: number;
  wind_speed: number;
}

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [fireRisks, setFireRisks] = useState<FireRisk[]>([])  // Bruker FireRisk type her
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      setLoading(true)
      setError("")
      try {
        const response = await fetch(`${OpenAPI.BASE}/api/v1/geonorge/${encodeURIComponent(searchTerm)}`)
        if (!response.ok) {
          throw new Error("Ingen treff funnet eller API-feil")
        }

        const data = await response.json()
        const limitedRisks = data.firerisks?.slice(0, 10) || []
        console.log(limitedRisks)

        setFireRisks(limitedRisks)
      } catch (err: any) {
        setError(err.message)
        setFireRisks([])
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Container maxW="full" centerContent>
      <Box pt={12} m={4} textAlign="center">
        <Text fontSize="2xl">
          Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          test
        </Text>
        <Text>Welcome back, nice to see you again!</Text>
      </Box>
      <Box w="100%" display="flex" justifyContent="center" mt={4}>
        <Input
          placeholder="Skriv inn et stedsnavn..."
          width="50%"
          maxWidth="600px"
          borderRadius="xl"
          boxShadow="md"
          p={4}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </Box>

      <Box mt={6} width="80%">
        {loading && <Spinner size="lg" />}
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {fireRisks.map((risk, idx) => (
          <Box key={idx} p={4} borderWidth="1px" borderRadius="lg" shadow="md">
            <Text><strong>Dato:</strong> {risk.timestamp}</Text>
            <Text><strong>Brannfareindeks (TTF):</strong> {risk.ttf}</Text>
            <Text><strong>Vindhastighet:</strong> {risk.wind_speed} m/s</Text>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

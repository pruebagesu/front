import { Card, Container } from "@chakra-ui/react"
import { type NextPage } from "next"
import Head from "next/head"
import AppHeader from "components/global/AppHeader"
import { Tabs, TabList, TabPanels } from "@chakra-ui/react"
import SalesPanel from "components/entities/sales/SalesPanel"
import ClientsPanel from "components/entities/clients/ClientsPanel"
import ProductsPanel from "components/entities/products/ProductsPanel"
import MyTab from "components/ui/tabs/MyTab"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Emprende FS</title>
        <meta name="description" content="EFS app frontend!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container marginTop={3}>
        <AppHeader />

        <Tabs variant="enclosed" colorScheme="blue" isLazy>
          <TabList border="none">
            <MyTab text="Ventas" icon="fas fa-dollar" />
            <MyTab text="Clientes" icon="fas fa-user" />
            <MyTab text="Productos" icon="fas fa-shopping-cart" />
          </TabList>
          <Card p={4} borderRadius="0 0.5rem 0.5rem 0.5rem">
            <TabPanels>
              <SalesPanel />
              <ClientsPanel />
              <ProductsPanel />
            </TabPanels>
          </Card>
        </Tabs>
      </Container>
    </>
  )
}

export default Home

import { Flex, TabPanel } from "@chakra-ui/react"

import { useState } from "react"
import { ClientFromDB } from "schemas/ClientSchema"
import SearchForm from "components/ui/forms/SearchForm"
import ClientItem from "./ClientItem"
import List from "components/ui/lists/List"
import useFetch from "hooks/useFetch"
import MyModal from "components/ui/modals/MyModal"
import ClientForm from "./ClientForm"
import SaleForm from "../sales/SaleForm"

const ClientsPanel = () => {
  const [selectedClient, setSelectedClient] = useState<ClientFromDB | null>()
  const { data, isLoading, refetch, setSearchText } = useFetch<ClientFromDB>({
    path: "clients",
    params: { toSell: false },
  })
  return (
    <TabPanel p={0}>
      <SearchForm
        setSearchText={setSearchText}
        placeholder="Buscar cliente..."
      />
      <List
        items={data}
        isLoading={isLoading}
        ListItem={ClientItem}
        isSelected={(c) => c?._id === selectedClient?._id}
        onItemClick={(c) => {
          const valueToSet = c?._id === selectedClient?._id ? null : c
          setSelectedClient(valueToSet)
        }}
      />
      <Flex>
        <MyModal
          title="Nueva venta"
          colorScheme="green"
          mr={2}
          disableButton={!selectedClient}
        >
          {({ onClose }) => (
            <SaleForm
              client={selectedClient}
              refetch={refetch}
              onClose={onClose}
            />
          )}
        </MyModal>
        <MyModal
          title={(selectedClient ? "Editar " : "Nuevo ") + "cliente"}
          mr={2}
        >
          <ClientForm clientId={selectedClient?._id} refetch={refetch} />
        </MyModal>
      </Flex>
    </TabPanel>
  )
}

export default ClientsPanel

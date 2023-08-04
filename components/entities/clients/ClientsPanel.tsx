import { Flex, TabPanel } from "@chakra-ui/react"

import { useState } from "react"
import { ClientFromDB } from "schemas/ClientSchema"
import SearchForm from "components/ui/forms/SearchForm"
import ClientItem from "./ClientItem"
import List from "components/ui/lists/List"
import MyModal from "components/ui/modals/MyModal"
import ClientForm from "./ClientForm"
import SaleForm from "../sales/SaleForm"
import paramsGenerator from "helpers/paramsGenerator"

const ClientsPanel = () => {
  const [selectedClient, setSelectedClient] = useState<ClientFromDB | null>()
  const [searchText, setSearchText] = useState("")

  const params = { toSell: false }
  const fetchPath = "clients"
  const PARAMS = paramsGenerator({ ...params, searchText })
  const queryKey = [fetchPath, PARAMS]
  return (
    <TabPanel p={0}>
      <SearchForm
        setSearchText={setSearchText}
        placeholder="Buscar cliente..."
      />
      <List
        path={fetchPath}
        params={PARAMS}
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
              queryKey={["sales"]}
              onClose={onClose}
            />
          )}
        </MyModal>
        <MyModal
          tabs={[
            {
              icon: "fas fa-edit",
              text: "Editar",
              component: (
                <ClientForm
                  clientId={selectedClient?._id}
                  queryKey={queryKey}
                />
              ),
            },
          ]}
          title="Nuevo cliente"
          mr={2}
        >
          <ClientForm queryKey={queryKey} />
        </MyModal>
      </Flex>
    </TabPanel>
  )
}

export default ClientsPanel

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
import SaleItem from "../sales/SaleItem"
import { SaleFromDB } from "schemas/SaleSchema"
import Attachments from "../attachments/Attachments"
import Comments from "../comments/Comments"

const ClientsPanel = () => {
  const [selectedClient, setSelectedClient] = useState<ClientFromDB | null>()
  const [searchText, setSearchText] = useState("")

  const params = { toSell: false }
  const fetchPath = "clients"
  const PARAMS = paramsGenerator({ ...params, searchText })
  const queryKey = [fetchPath, PARAMS]
  return (
    <TabPanel p={0}>
      <Flex>
        <SearchForm
          setSearchText={setSearchText}
          placeholder="Buscar cliente..."
        />
        <MyModal
          title="Nuevo cliente"
          icon="fas fa-plus"
          colorScheme="green"
          ml={3}
        >
          <ClientForm />
        </MyModal>
      </Flex>
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
          tabs={[
            {
              icon: "fas fa-dollar",
              text: "Ventas",
              component: (
                <List<SaleFromDB>
                  path={`sales/client/${selectedClient?._id}`}
                  title="Últimas ventas"
                  ListItem={({ item, onClick, selected }) => (
                    <SaleItem
                      item={item}
                      onClick={onClick}
                      selected={selected}
                      fromClient
                    />
                  )}
                  my={0}
                />
              ),
            },
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
            {
              icon: "fas fa-comment",
              text: "Comentarios",
              component: (
                <Comments entity="client" entityId={selectedClient?._id} />
              ),
            },
            {
              icon: "fas fa-paperclip",
              text: "Adjuntos",
              component: (
                <Attachments entity="client" entityId={selectedClient?._id} />
              ),
            },
          ]}
          buttonText="Ver cliente"
          mr={2}
          disableButton={!selectedClient}
        />
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
      </Flex>
    </TabPanel>
  )
}

export default ClientsPanel

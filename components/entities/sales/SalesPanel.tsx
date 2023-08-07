import { TabPanel } from "@chakra-ui/react"
import MyModal from "components/ui/modals/MyModal"
import { useState } from "react"
import { SaleFromDB } from "schemas/SaleSchema"
import SaleForm from "./SaleForm"
import List from "components/ui/lists/List"
import SaleItem from "./SaleItem"
import SaleSummaryItem from "./SaleSummaryItem"
import { SummarySaleFromDB } from "schemas/SaleSchema"
import paramsGenerator from "helpers/paramsGenerator"
import Attachments from "../attachments/Attachments"

type Period = { month: number | undefined; year: number | undefined }

const SalesPanel = () => {
  const [selectedSale, setSelectedSale] = useState<SaleFromDB | null>()
  const [selectedPeriod, setSelectedPeriod] = useState<Period>({
    month: undefined,
    year: undefined,
  })

  const params = {
    toSell: false,
    month: selectedPeriod.month,
    year: selectedPeriod.year,
  }
  const fetchPath = "sales"
  const PARAMS = paramsGenerator({ ...params })

  return (
    <TabPanel p={0}>
      <List<SummarySaleFromDB>
        path="sales/summary"
        ListItem={SaleSummaryItem}
        isSelected={(p) =>
          p?._id.month === selectedPeriod?.month &&
          p?._id.year === selectedPeriod?.year
        }
        onItemClick={(p, selected) => {
          const monthToSet = selected ? undefined : p?._id?.month
          const yearToSet = selected ? undefined : p?._id?.year
          setSelectedPeriod({ month: monthToSet, year: yearToSet })
        }}
        fdr
        my={1}
      />
      <List<SaleFromDB>
        path={fetchPath}
        params={PARAMS}
        ListItem={SaleItem}
        isSelected={(s) => s?._id === selectedSale?._id}
        onItemClick={(s) => {
          const valueToSet = s?._id === selectedSale?._id ? null : s
          setSelectedSale(valueToSet)
        }}
      />
      <MyModal
        buttonText="Ver venta"
        colorScheme="blue"
        disableButton={!selectedSale}
        tabs={[
          {
            icon: "fas fa-dollar",
            text: "Detalle",
            component: <SaleForm saleId={selectedSale?._id} />,
          },
          {
            icon: "fas fa-paperclip",
            text: "Adjuntos",
            component: (
              <Attachments entity="product" entityId={selectedSale?._id} />
            ),
          },
        ]}
      />
    </TabPanel>
  )
}

export default SalesPanel

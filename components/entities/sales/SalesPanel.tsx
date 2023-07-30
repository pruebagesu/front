import { TabPanel } from "@chakra-ui/react"
import MyModal from "components/ui/modals/MyModal"
import { useState } from "react"
import { SaleFromDB } from "schemas/SaleSchema"
import SaleForm from "./SaleForm"
// import SalesSummary from "./SalesSummary"
import List from "components/ui/lists/List"
import SaleItem from "./SaleItem"
import useFetch from "hooks/useFetch"
import SaleSummaryItem from "./SaleSummaryItem"
import { SummarySaleFromDB } from "schemas/SaleSchema"

type Period = { month: number | undefined; year: number | undefined }

const SalesPanel = () => {
  const [selectedItem, setSelectedItem] = useState<SaleFromDB | null>()
  const [selectedPeriod, setSelectedPeriod] = useState<Period>({
    month: undefined,
    year: undefined,
  })

  const { data, isLoading } = useFetch<SaleFromDB>({
    path: "sales",
    params: {
      toSell: false,
      month: selectedPeriod.month,
      year: selectedPeriod.year,
    },
  })
  const summary = useFetch<SummarySaleFromDB>({
    path: "sales/summary",
    refetchOnMount: true,
    staleTime: 0,
  })

  return (
    <TabPanel p={0}>
      <List
        items={summary.data}
        isLoading={summary.isLoading}
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
      <List
        items={data}
        isLoading={isLoading}
        ListItem={SaleItem}
        isSelected={(s) => s?._id === selectedItem?._id}
        onItemClick={(s) => {
          const valueToSet = s?._id === selectedItem?._id ? null : s
          setSelectedItem(valueToSet)
        }}
      />
      <MyModal
        title="Detalle"
        buttonText="Ver venta"
        colorScheme="blue"
        disableButton={!selectedItem}
      >
        {({ onClose }) => (
          <SaleForm saleId={selectedItem?._id} onClose={onClose} />
        )}
      </MyModal>
    </TabPanel>
  )
}

export default SalesPanel

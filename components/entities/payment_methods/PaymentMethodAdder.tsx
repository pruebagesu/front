import { Flex, Heading, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import { useFormContext } from "react-hook-form"
import { PaymentMethod, Sale } from "schemas/SaleSchema"
import PaymentMethodsSubtotal from "./PaymentMethodSubtotal"
import MyModal from "components/ui/modals/MyModal"
import PaymentMethodForm from "./PaymentMethodForm"

interface Props {
  fieldName: keyof Sale
  saleId?: string
}

function PaymentMethodAdder({ fieldName, saleId }: Props) {
  const { watch } = useFormContext()
  const paymentMethods = watch(fieldName)

  return (
    <Flex flexDir="column" mb={4}>
      <Flex alignItems="center" justifyContent={"space-between"} mt="4" mb={3}>
        <Heading size="lg" m={0}>
          Forma de pago
        </Heading>
        {!saleId && (
          <MyModal title="Elegir medio de pago" buttonText="Agregar" size="xs">
            <PaymentMethodForm />
          </MyModal>
        )}
      </Flex>
      {(!paymentMethods || paymentMethods.length === 0) && (
        <Text mb={5} textAlign="center" w="100%">
          No se ha agregado ningún método de pago
        </Text>
      )}
      {paymentMethods.map((pm: PaymentMethod, index: number) => (
        <Flex
          key={index}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Flex alignItems="center">
            {!saleId && (
              <MyDeleteIcon<Sale> fieldName="payment_methods" index={index} />
            )}
            <Text ml={!saleId ? 2 : 0}>{pm.method}</Text>
          </Flex>
          <Text>${pm.amount}</Text>
        </Flex>
      ))}
      <PaymentMethodsSubtotal />
    </Flex>
  )
}

export default PaymentMethodAdder

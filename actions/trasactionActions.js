

export function removeMoney(customerName) {
  return {
    type: 'removeMoney',
    customerName: customerName
   }
}

export function addMoney(customerName) {
  return {
    type: 'addMoney',
    customerName: customerName
   }
}

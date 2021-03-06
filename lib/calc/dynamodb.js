import { reduceRange } from '@/lib/price'
import { toNumber } from '@/lib/validator'
import { MONTHLY_HOURS } from '@/config/constants'

export default (row, priceList) => {
  const storage = toNumber(row.storage)
  const wcu = toNumber(row.wcu)
  const rcu = toNumber(row.rcu)

  let total = 0

  if (storage) {
    total += reduceRange(storage, priceList.dynamodb.storage.priceRange)
  }

  if (wcu) {
    total += reduceRange(wcu * MONTHLY_HOURS, priceList.dynamodb.wcu.priceRange)
  }

  if (rcu) {
    total += reduceRange(rcu * MONTHLY_HOURS, priceList.dynamodb.rcu.priceRange)
  }

  return total
}

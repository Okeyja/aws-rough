<template>
  <span class="detail-title-copy" ref="copy">{{ isCopied ? 'コピーした！' : 'リンクを作成' }}</span>
</template>

<script>
import ClipBoard from 'clipboard'
import { formatPrice } from '@/lib/price'
import { generateHash } from '@/lib/hash'
import { minifyTable } from '@/lib/service'
import { postZ } from '@/api'

export default {
  name: 'DetailCopy',
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isCopied: false
    }
  },
  computed: {
    total() {
      return this.$store.state.total.jpy
    }
  },
  mounted() {
    this.board = new ClipBoard(this.$refs.copy, {
      text: () => {
        const homeUrl = process.env.HOME_URL || 'https://aws.noplan.cc'
        const minimalTable = minifyTable(this.$store.state.tables)
        const data = JSON.stringify(minimalTable)
        const hash = generateHash(data)

        this.$store.dispatch('postZ', { postZ, hash, data })
        this.isCopied = true
        this.timerId = setTimeout(() => {
          this.clearCopied()
        }, 1200)

        return `${homeUrl}/detail/?z=${hash}`
      }
    })
  },
  beforeDestroy() {
    this.clearCopied()
    if (this.board) {
      this.board.destroy()
    }
  },
  board: null,
  timerId: null,
  methods: {
    clearCopied() {
      if (this.isCopied) {
        this.isCopied = false
      }

      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = null
      }
    },
    yen(price) {
      return formatPrice(price)
    }
  }
}
</script>

import { authenticator } from '@otplib/preset-browser'
import * as render from './render.pug'
export default {
  ...render,
  data () {
    return {
      secret: '',
      code: '',
      errorMessage: '',
      interval: null
    }
  },
  mounted () {
    const { generate } = this
    generate()
    this.interval = setInterval(function () {
      generate()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    generate () {
      this.errorMessage = ''
      const { secret } = this
      try {
        this.code = authenticator.generate(secret)
      } catch (err) {
        this.errorMessage = err.message
      }
    }
  }
}

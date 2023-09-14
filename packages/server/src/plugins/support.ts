import fp from 'fastify-plugin'

export default fp((fastify: { decorate: (arg0: string, arg1: () => string) => void }, _: any, next: () => void) => {
  fastify.decorate('someSupport', function() {
    return 'hugs'
  })
  next()
})

declare module 'fastify' {
  interface FastifyInstance {
    someSupport(): string
  }
}

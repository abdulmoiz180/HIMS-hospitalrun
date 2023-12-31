import { join } from 'path'
import AutoLoad from 'fastify-autoload'
import { FastifyInstance } from 'fastify'
import { nextCallback } from 'fastify-plugin'
import noIcon from 'fastify-no-icon'
import helmet from 'fastify-helmet'
import qs from 'qs'
//import cors  from 'fastify-cors'

function HospitalRun(fastify: FastifyInstance, opts: any, next: nextCallback) {
  fastify.register(require('fastify-cors'), {
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  fastify.register(helmet)
  fastify.register(noIcon)

  // This loads all application wide plugins defined in plugins folder
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    includeTypeScript: true,
    options: { ...opts },
  })

  // This loads all routes and services defined in services folder
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'services'),
    includeTypeScript: true,
    options: { ...opts },
  })

  next()
}

HospitalRun.options = {
  querystringParser: (str: string) => qs.parse(str),
  logger: true,
  ignoreTrailingSlash: true,
}

export = HospitalRun

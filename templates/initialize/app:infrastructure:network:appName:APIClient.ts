import axios, { AxiosResponse } from 'axios'
import { Context } from '@nuxt/types/app'
import { APIRequest } from '@/infrastructure/network/APIRequest'
import { APIError } from '@/infrastructure/network/APIError'
import { HTTPMethod } from '@/infrastructure/network/types'

interface HttpError extends Error {
  response?: {
    status: number
  }
  message: string
}

export class APIClient {
  baseURL: string = ''
  timeout: number = 60 * 1000 * 10
  isSwagger: boolean = false

  constructor(private ctx?: Context) {
    const host = process.env.FLAG_SWAGGER === 'enabled' ? process.env.SWAGGER_API : process.env.APPLICATION_API
    this.baseURL = `${host}`
  }

  request<U>(request: APIRequest<U>): Promise<U> {
    const isRead = request.method === HTTPMethod.GET
    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: 'POST',
          params: isRead && request.params,
          data: !isRead && this.encodedParams(request),
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders(request),
          maxContentLength: Infinity
        })
        .then((data) => {
          if (!process.server || !this.ctx) {
            return data
          }
          const setCookie: string[] | undefined = data.headers['set-cookie']
          if (setCookie) {
            setCookie.forEach((s) => {
              // @ts-ignore
              this.ctx.res.setHeader('set-cookie', s)
            })
          }
          return data
        })
        .then((data) => {
          const response = request.parse ? request.parse(data) : this.parse<U>(data)
          resolve(response)
        })
        .catch((err) => {
          const apiError = this.normalizeError(err)
          reject(apiError)
        })
    })
  }

  // Default parser
  private parse<U>(data: AxiosResponse): U {
    return data.data
  }

  // Convert axios error into APIError
  private normalizeError(error: HttpError): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error
    }
  }

  private encodedParams(request: any) {
    const params = request.params
    if (request.contentType === 'multipart/form-data') {
      const urlParams = new FormData()
      Object.entries<string>(params).map(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((entry) => {
            urlParams.append(key + '[]', JSON.stringify(entry))
          })
        } else {
          urlParams.append(key, value)
        }
      })
      return urlParams
    }
    return params
  }

  // Create headers
  private createHeaders(request: any) {
    const ctx = this.ctx

    if (!ctx) {
      const header = {}
      return header
    }

    const crypto = require('crypto')
    const clientId = process.env.AUTH_CLIENT_ID
    const secret = process.env.AUTH_SECRET
    const timestamp = Date.now()
    const nonce = crypto
      .createHmac('sha256', secret)
      .update(timestamp)
      .digest('hex')
    const sign = `${clientId}.${timestamp}.${nonce}`
    const signature = crypto
      .createHmac('sha256', secret)
      .update(sign)
      .digest('hex')

    let header = {
      'Content-Type': request.contentType,
      xhrFields: true,
      withCredentials: true,
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Bearer ' + ctx.app.$cookies.get('accessToken'),
      'X-Auth-Client-Id': clientId,
      'X-Auth-Timestamp': timestamp,
      'X-Auth-Nonce': nonce,
      'X-Auth-Signature': btoa(signature),
      'X-HTTP-Method-Override': request.method
    } as object

    if (process.env.FLAG_SWAGGER === 'enabled') {
      return {}
    }

    if (process.server) {
      header = {
        ...header,
        ...ctx.req.headers
      }
    }
    return header
  }
}

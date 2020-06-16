import { <%= appName %> } from '../schema'
import { APIRequest } from '@/infrastructure/network/APIRequest'
import { HTTPMethod } from '@/infrastructure/network/types'
import { Login as LoginSchema, Signup as SignupSchema } from '@/infrastructure/network/<%= appName %>/schema'

export class Activate implements APIRequest<<%= appName %>.Auth.getActivateResponse> {
  response: <%= appName %>.Auth.getActivateResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor(id: string) {
    this.path = `/activate/${id}`
  }
}

export class Login implements APIRequest<<%= appName %>.Auth.authLoginResponse> {
  response: <%= appName %>.Auth.authLoginResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.Auth.authLoginRequest
  constructor(params: LoginSchema) {
    this.params = params
    this.path = '/login'
  }
}

export class Signup implements APIRequest<<%= appName %>.Auth.authSignupResponse> {
  response: <%= appName %>.Auth.authSignupResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.POST
  params: <%= appName %>.Auth.authSignupRequest
  constructor(params: SignupSchema) {
    this.params = params
    this.path = '/signup'
  }
}

export class Refresh implements APIRequest<<%= appName %>.Auth.authRefreshResponse> {
  response: <%= appName %>.Auth.authRefreshResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor() {
    this.path = '/refresh'
  }
}

export class Me implements APIRequest<<%= appName %>.Auth.getMeResponse> {
  response: <%= appName %>.Auth.getMeResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor() {
    this.path = '/me'
  }
}

export class Logout implements APIRequest<<%= appName %>.Auth.autLogoutResponse> {
  response: <%= appName %>.Auth.autLogoutResponse
  path: string
  contentType = 'application/json'
  method = HTTPMethod.GET
  constructor() {
    this.path = '/logout'
  }
}

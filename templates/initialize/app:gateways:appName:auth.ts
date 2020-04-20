import { <%= appName %>GatewayBase } from './base'
import { toLoginSeed } from './translator/login'
import { toSignupSeed } from './translator/signup'
import { toMeProps } from './translator/me'
import { Login, Signup, Refresh, Me } from '@/infrastructure/network/<%= appName %>/requests/auth'
import { IMeProps, EmptyMePropsFactory } from '@/entities/Me'
import LoginEntity from '@/entities/Login'
import SignupEntity from '@/entities/Signup'

export default class Auth extends <%= appName %>GatewayBase {
  async Login(entity: LoginEntity): Promise<string> {
    const { login } = await this.apiClient.request(new Login(toLoginSeed(entity.props)))
    return login ? login.access_token : ''
  }

  async Signup(entity: SignupEntity): Promise<string> {
    const { login } = await this.apiClient.request(new Signup(toSignupSeed(entity.props)))
    return login ? login.access_token : ''
  }

  async Refresh(): Promise<string> {
    const { login } = await this.apiClient.request(new Refresh())
    return login ? login.access_token : ''
  }

  async Me(): Promise<IMeProps> {
    const { me } = await this.apiClient.request(new Me())
    return me ? toMeProps(me) : EmptyMePropsFactory()
  }
}
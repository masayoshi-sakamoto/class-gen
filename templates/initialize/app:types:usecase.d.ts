/* eslint-disable no-undef */
declare interface BaseUseCase {
  execute: (params?: any) => Promise<any>
}
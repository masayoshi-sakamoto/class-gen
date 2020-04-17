declare interface FluxStandardAction<Payload> {
  readonly type: string
  payload?: Payload
}

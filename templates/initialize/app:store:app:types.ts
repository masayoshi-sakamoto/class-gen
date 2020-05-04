import MeEntity from '@/entities/Me'
import MenuEntity from '@/entities/Menu'

export const Types = {
  dialog: 'dialog',
  drawer: 'drawer',
  errors: 'errors',
  loading: 'loading',
  me: 'me',
  menus: 'menus',
  refresh: 'refresh',
  url: 'url'
}

export const path = 'app/'

export class Dialog implements FluxStandardAction<Object> {
  type = path + Types.dialog
  constructor(public payload: { type: string; value: boolean | null }) {}
}

export class Drawer implements FluxStandardAction<boolean | null> {
  type = path + Types.drawer
  constructor(public payload: boolean | null) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Me implements FluxStandardAction<MeEntity> {
  type = path + Types.me
  constructor(public payload: MeEntity) {}
}

export class Menus implements FluxStandardAction<MenuEntity[]> {
  type = path + Types.menus
  constructor(public payload: MenuEntity[]) {}
}

export class Refresh implements FluxStandardAction<any> {
  type = path + Types.refresh
  constructor() {}
}

export class Url implements FluxStandardAction<string> {
  type = path + Types.url
  constructor(public payload: string) {}
}

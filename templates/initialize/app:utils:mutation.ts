export function mutation(mutations: any, type: string) {
  let m = {}
  Object.entries(mutations).forEach(([key, value]) => {
    m = {
      ...m,
      [type + key]: value
    }
  })
  return m
}

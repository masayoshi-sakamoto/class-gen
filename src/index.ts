const fs = require('fs')
const path = require('path')
const commander = require('commander')
const ejs = require('ejs')
const inflector = require('./lib/inflector')
var pkg = require('../package.json');

try {
  commander.version(pkg.version).option('-d, --dist <dist>', 'output directory').option('-a, --appname <appname>', 'application name')

  commander.command('entity [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
    entities(className)
  })

  commander.command('repository [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
    repositories(className)
  })

  commander.command('gateway [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
     gateways(className)
  })

  commander.command('infra [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }    
    infrastructure(className)
  })

  commander.command('store [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
    store(className)
  })

  commander.command('usecase [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
    usecase(className)
  })

  commander.command('swagger [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
    swagger(className)
  })

  commander.command('components [className]').action((className: string) => {
    if (!className) {
      console.error('className is required.')
      return
    }
    components(className)
  })

  commander.command('injector').action((className: string) => {
    injector()
  })

  commander.command('index').action((className: string) => {
    index()
  })
  
  commander
    .command('generate [className]')
    .action((className: string) => {
      entities(className)
      repositories(className)
      gateways(className)
      infrastructure(className)
      store(className)
      usecase(className)
      swagger(className)
      components(className)
      injector()
    })

  commander.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}

function initialize() {
  commander.dist = !commander.dist ? 'app' : commander.dist
  if (!fs.existsSync(commander.dist)) {
    fs.mkdirSync(commander.dist)
  }
}

function initializeSwagger() {
  if (!fs.existsSync('swagger')) {
    fs.mkdirSync('swagger')
  }
}

function makeDir(dirpath: string, newpath: string) {
  const dist = path.resolve(dirpath, newpath)
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
  }
  return dist
}

function generator(params: { type: string; dist: string; filename?: string; name: string; outfile?: string; ext?: string; options: any }) {
  const { type, dist, filename, outfile, options, name, ext } = params
  const Ext = !ext ? '.ts' : ext
  const Filename = !filename ? 'class' : filename
  const Outfile = !outfile ? name : outfile
  const template = path.resolve(__dirname, '../templates/' + type + '/' + Filename + '.ejs')
  const content = ejs.render(fs.readFileSync(template, 'utf-8'), options)
  const filepath = path.resolve(dist, Outfile + Ext)
  fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' })
  console.log('Generated:', filepath)
}

function entities(className: string) {
  const type = 'entities'
  initialize()
  const dist = makeDir(commander.dist, type)
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  generator({ type, dist, name, options: { name } })
}

function repositories(className: string) {
  const type = 'repositories'
  initialize()
  const dist = makeDir(commander.dist, type)
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  generator({ type, dist, name, outfile: name + 'Repository', options: { name } })
}

function gateways(className: string) {
  const type = 'gateways'
  commander.appname = commander.appname === undefined ? 'application' : commander.appname
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  const names = inflector.pluralize(name)
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)

  initialize()
  const gateway = makeDir(makeDir(commander.dist, type), appName)
  const translator = makeDir(gateway, 'translator')

  generator({ type, dist: gateway, name, outfile: name.toLowerCase(), options: { name, names, appName } })
  generator({
    type,
    dist: translator,
    name,
    outfile: name.toLowerCase(),
    filename: 'translator',
    options: { name, names, appName }
  })
}

function infrastructure(className: string) {
  const type = 'infrastructure'
  commander.appname = !commander.appname ? 'application' : commander.appname
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  const names = inflector.pluralize(name)
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)

  initialize()
  const dist = makeDir(makeDir(makeDir(makeDir(commander.dist, type), 'network'), appName), 'requests')
  generator({ type, dist, name, outfile: name.toLowerCase(), options: { name, names, appName } })
}

function store(className: string) {
  const type = 'store'
  const name = className.charAt(0).toUpperCase() + className.slice(1)

  initialize()
  const dist = makeDir(makeDir(commander.dist, type), name.toLowerCase())
  generator({ type, dist, name, outfile: 'index', filename: 'index', options: { name } })
  generator({ type, dist, name, outfile: 'mutations', filename: 'mutations', options: { name } })
  generator({ type, dist, name, outfile: 'state', filename: 'state', options: { name } })
  generator({ type, dist, name, outfile: 'types', filename: 'types', options: { name } })
}

function usecase(className: string) {
  const type = 'usecase'
  commander.appname = !commander.appname ? 'application' : commander.appname
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  const names = inflector.pluralize(name)
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)

  initialize()
  const dist = makeDir(makeDir(commander.dist, type), name.toLowerCase())
  generator({ type, dist, name, outfile: 'Delete' + name + 'UseCase', filename: 'delete', options: { name, names, appName } })
  generator({ type, dist, name, outfile: 'Fetch' + names + 'UseCase', filename: 'fetch', options: { name, names, appName } })
  generator({ type, dist, name, outfile: 'Save' + name + 'UseCase', filename: 'save', options: { name, names, appName } })
  generator({ type, dist, name, outfile: 'Update' + names + 'UseCase', filename: 'update', options: { name, names, appName } })
}

function swagger(className: string) {
  const type = 'swagger'
  commander.appname = !commander.appname ? 'application' : commander.appname
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  const names = inflector.pluralize(name)
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)

  initializeSwagger()
  let dist = makeDir(makeDir(makeDir(makeDir(type, 'src'), 'components'), 'schemas'), name.toLowerCase())
  generator({ ext: '.yml', type, dist, name, outfile: 'index', filename: 'index', options: { name, names, appName } })
  generator({ ext: '.yml', type, dist, name, outfile: 'seed', filename: 'seed', options: { name, names, appName } })

  dist = makeDir(makeDir(makeDir(type, 'src'), 'paths'), names.toLowerCase())
  generator({ ext: '.yml', type, dist, name, outfile: 'path', filename: 'path', options: { name, names, appName } })
  generator({ ext: '.yml', type, dist, name, outfile: 'paths', filename: 'paths', options: { name, names, appName } })
}

function components(className: string) {
  const type = 'components'
  commander.appname = !commander.appname ? 'application' : commander.appname
  const name = className.charAt(0).toUpperCase() + className.slice(1)
  const names = inflector.pluralize(name)
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)

  initialize()
  let dist = makeDir(makeDir(makeDir(makeDir(commander.dist, type), 'organisms'), 'Form'), name)
  generator({ type, dist, name, outfile: 'fixtures', filename: 'fixtures', options: { name, names, appName } })
  generator({ type, dist, name, outfile: name + '.story', filename: 'form.story', options: { name, names, appName } })
  generator({ type, dist, name, outfile: 'index', filename: 'index', options: { name, names, appName } })
  generator({ ext: '.vue', type, dist, name, filename: 'form', options: { name, names, appName } })

  dist = makeDir(makeDir(makeDir(makeDir(commander.dist, type), 'organisms'), 'List'), name)
  generator({ type, dist, name, outfile: 'fixtures', filename: 'fixtures', options: { name, names, appName } })
  generator({ type, dist, name, outfile: name + '.story', filename: 'list.story', options: { name, names, appName } })
  generator({ type, dist, name, outfile: 'index', filename: 'index', options: { name, names, appName } })
  generator({ ext: '.vue', type, dist, name, filename: 'list', options: { name, names, appName } })

  dist = makeDir(makeDir(makeDir(commander.dist, type), 'templates'), name)
  generator({ type, dist, name, outfile: 'fixtures', filename: 'fixtures', options: { name, names, appName } })
  generator({ type, dist, name, outfile: name + '.story', filename: 'templates.story', options: { name, names, appName } })
  generator({ type, dist, name, outfile: 'index', filename: 'index', options: { name, names, appName } })
  generator({ ext: '.vue', type, dist, name, filename: 'templates', options: { name, names, appName } })

  dist = makeDir(makeDir(commander.dist, 'pages'), name.toLowerCase())
  generator({ ext: '.vue', type, dist, name, outfile: 'index', filename: 'page', options: { name, names, appName } })

}

function injector() {
  const type = 'injector'
  commander.appname = !commander.appname ? 'application' : commander.appname
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)
  
  initialize()
  const read = makeDir(commander.dist, 'repositories')
  const repositories = fs.readdirSync(read)

  let dist = makeDir(commander.dist, 'plugins')
  generator({ type, dist, name: '', outfile: 'injector', filename: 'plugins', options: { repositories, appName } })

  dist = makeDir(commander.dist, 'presenter')
  generator({ type, dist, name: '', outfile: 'injector', filename: 'presenter', options: { repositories, appName } })

  dist = makeDir(commander.dist, 'types')
  generator({ type, dist, name: '', outfile: 'nuxt.d', filename: 'types', options: { repositories, appName } })
}

function index() {
  const type = 'index'
  commander.appname = !commander.appname ? 'application' : commander.appname
  const appName = commander.appname.charAt(0).toUpperCase() + commander.appname.slice(1)
  
  initialize()
  let read = makeDir(makeDir(commander.dist, 'gateways'), appName)
  let files = fs.readdirSync(read)
  let dist = read
  generator({ type, dist, name: '', outfile: 'index', filename: 'gateways', options: { files, appName } })

  read = makeDir(commander.dist, 'store')
  files = fs.readdirSync(read)
  dist = read
  generator({ type, dist, name: '', outfile: 'index', filename: 'store', options: { files, appName } })

}

declare const fs: any;
declare const path: any;
declare const commander: any;
declare const ejs: any;
declare const inflector: any;
declare var pkg: any;
declare function init(): void;
declare function initSwagger(): void;
declare function makeDir(dirpath: string, newpath: string): any;
declare function generator(params: {
    type: string;
    dist: string;
    filename?: string;
    name: string;
    outfile?: string;
    ext?: string;
    options: any;
}): void;
declare function entities(className: string): void;
declare function repositories(className: string): void;
declare function gateways(className: string): void;
declare function infrastructure(className: string): void;
declare function store(className: string): void;
declare function usecase(className: string): void;
declare function swagger(className: string): void;
declare function swaggerIndex(): void;
declare function components(className: string): void;
declare function injector(): void;
declare function index(): void;
declare function initialize(): void;

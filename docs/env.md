# 脚手架开发模式及环境变量说明

## 选择运行模式

1.  npm 仅执行 vite 命令时, 项目将启动本地服务，运行在开发 server 模式下
2.  npm 执行 vite build 命令时，项目将会调用 rollup 进行构建，运行在编译 build 模式下

> 在 vite 配置文件 vite.config.js 中通过 vite 内置接口 command: "build" | "serve" 获取当前运行的模式

## 加载并获取环境变量

1. 基于运行模式命令 通过指定参数 --mode [自定义环境变量文件名] 加载不同环境变量配置（配置内容见文件内）
2. 当前环境运行在 vite 层，无法直接访问 node 环境变量 可通过 const env = loadEnv(mode, process.cwd(), ''); env.NODE_ENV 访问
3. 环境配置文件已被 vite 进行包装，例如： .env.uat 配置文件中的 NODE_ENV = uat ，应通过 env.VITE_USER_NODE_ENV 访问

> 在 vite 配置文件 vite.config.js 中通过 vite 内置接口 mode 获取当前运行的模式 当前项目支持 4 种环境变量配置 mode : 'development | production | test | uat'

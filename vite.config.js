import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator'; // 导入代码混淆插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 使用 Vite 的 Vue 插件进行 Vue 项目的构建
    vue(),
    // 配置代码混淆插件
    obfuscator({
      global: true, // 启用全局配置，影响所有文件
      // 配置项参考：https://github.com/javascript-obfuscator/javascript-obfuscator
      // options: {
      compact: true, // 压缩代码，移除不必要的空格和换行
      controlFlowFlattening: true, // 启用控制流平坦化，混淆代码结构，增加代码阅读难度
      controlFlowFlatteningThreshold: 0.75, // 控制流平坦化的应用阈值，表示至少 75% 的代码将被平坦化
      numbersToExpressions: true, // 将数字替换为数学表达式，增加混淆
      simplify: true, // 简化代码，减少冗余代码
      //   stringArrayShuffle: true, // 打乱字符串数组的顺序，增加代码分析难度
      splitStrings: true, // 将长字符串拆分成多个短字符串
      //   splitStringsChunkLength: 10, // 拆分字符串的最大长度为 10
      //   rotateUnicodeArray: true, // 启用 Unicode 数组的旋转，增加分析的复杂度
      deadCodeInjection: true, // 注入无用的死代码来增加混淆
      //   deadCodeInjectionThreshold: 0.4, // 死代码注入的比例阈值，表示至少 40% 的代码为死代码
      //   debugProtection: true, // 启用调试保护，防止调试工具干扰代码执行
      //   debugProtectionInterval: 2000, // 设置调试保护间隔，防止频繁的调试攻击
      //   disableConsoleOutput: true, // 禁用控制台输出，防止泄露敏感信息
      //   domainLock: ["http://127.0.0.1:8080"], // 设置仅在指定的域名下执行代码，增加安全性
      //   identifierNamesGenerator: "hexadecimal", // 使用十六进制命名标识符，混淆代码
      //   identifiersPrefix: "", // 标识符的前缀，空表示没有前缀
      //   inputFileName: "", // 输入文件名，留空表示不指定
      //   log: true, // 启用日志记录，帮助开发者调试和跟踪代码混淆过程
      //   renameGlobals: true, // 启用全局变量重命名，避免暴露全局变量名称
      //   reservedNames: [], // 保留的变量名列表，不会被混淆的变量
      //   reservedStrings: [], // 保留的字符串列表，不会被混淆的字符串
      //   seed: 0, // 设置混淆的随机种子，确保每次混淆的一致性
      //   selfDefending: true, // 启用自我保护，防止被反混淆
      //   sourceMap: false, // 禁用源映射，防止源码泄露
      //   sourceMapBaseUrl: "", // 源映射的基础 URL
      //   sourceMapFileName: "", // 源映射的文件名
      //   sourceMapMode: "separate", // 设置源映射模式为单独文件
      //   stringArray: true, // 启用字符串数组，优化字符串的存储方式
      //   stringArrayEncoding: ["base64"], // 使用 base64 编码字符串数组，增加代码难度
      //   stringArrayThreshold: 0.75, // 字符串数组的阈值，表示 75% 的字符串将被放入数组
      //   target: "browser", // 设置目标环境为浏览器
      //   transformObjectKeys: true, // 转换对象的键名，增加混淆
      //   unicodeEscapeSequence: true, // 启用 Unicode 转义序列，增加代码难度

      //   domainLockRedirectUrl: "about:blank", // 设置域名锁定重定向 URL，防止代码被其他网站执行
      //   forceTransformStrings: [], // 强制转换的字符串列表，指定必须混淆的字符串
      //   identifierNamesCache: null, // 标识符名称缓存，优化性能
      //   identifiersDictionary: [], // 自定义标识符字典，用于自定义混淆标识符
      //   ignoreImports: true, // 忽略导入的文件，不对外部库进行混淆
      //   optionsPreset: "default", // 使用默认的配置预设
      //   renameProperties: false, // 禁用属性重命名
      //   renamePropertiesMode: "safe", // 属性重命名的安全模式
      //   sourceMapSourcesMode: "sources-content", // 设置源映射的源模式，使用源内容

      //   stringArrayCallsTransform: true, // 启用字符串数组调用转换，增强混淆
      //   stringArrayCallsTransformThreshold: 0.5, // 字符串数组调用转换的阈值，表示 50% 的调用会被转换

      stringArrayIndexesType: ["hexadecimal-number"], // 字符串数组索引的类型为十六进制数字
      stringArrayIndexShift: true, // 启用字符串数组索引位移
      stringArrayRotate: true, // 启用字符串数组旋转
      stringArrayWrappersCount: 1, // 字符串数组包装器的数量
      stringArrayWrappersChainedCalls: true, // 启用字符串数组包装器的链式调用
      stringArrayWrappersParametersMaxCount: 2, // 字符串数组包装器最大参数个数
      stringArrayWrappersType: "variable", // 使用变量类型的字符串数组包装器

      assumeFunctionWrapper: true, // 假设函数被包装，防止被直接调用
      bind: true, // 启用 bind 绑定，增加混淆难度
      controlFlowFlatteningMaxDepth: 2, // 控制流平坦化的最大深度，避免过度平坦化
      rotateStrings: true // 启用字符串旋转，增加混淆复杂度
      // }
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: true
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://yyfx.xiaobaibubai.com',
        changeOrigin: true,
        // 删除 rewrite，直接转发
      }
    }
  }
})
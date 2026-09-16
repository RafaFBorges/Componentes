/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Necessário: o pacote @rafafborges/componentes exporta .ts/.tsx direto
  // (main/types em ./src/index.ts), sem build próprio. O Next precisa
  // transpilar esse código como se fosse parte do próprio app.
  transpilePackages: ['@rafafborges/componentes'],
  webpack: (config) => {
    // A dependência "file:.." vira um symlink em node_modules apontando
    // para a pasta real do pacote (Componentes/). Sem isso, o Webpack
    // resolve o symlink para o caminho real e passa a procurar
    // node_modules a partir de lá (onde tinycolor2/react-icons não
    // estão instalados), em vez de a partir de playground/node_modules.
    config.resolve.symlinks = false
    return config
  },
}
 
module.exports = nextConfig
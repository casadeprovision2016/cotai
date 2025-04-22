# Stage 1: Construir a aplicação React
# Usamos uma imagem Node com Alpine para um tamanho menor
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock) primeiro
# para aproveitar o cache do Docker se as dependências não mudarem
COPY package.json ./
# Se você usar yarn, descomente a linha abaixo e comente a próxima
# COPY yarn.lock ./
COPY package-lock.json ./

# Instala as dependências
# Se você usar yarn, use 'RUN yarn install'
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Constrói a aplicação para produção
# Se você usar yarn, use 'RUN yarn build'
RUN npm run build

# Stage 2: Servir a aplicação com Nginx
# Usamos uma imagem Nginx com Alpine
FROM nginx:1.25-alpine

# Copia os arquivos estáticos gerados no Stage 1 para o diretório raiz do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (porta padrão do Nginx)
EXPOSE 80

# Comando para iniciar o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"] 

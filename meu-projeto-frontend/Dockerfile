# 1. Imagem base: Baixa o Node.js oficial na versão 20 em uma versão Linux leve (alpine)
FROM node:20-alpine

# 2. Diretório de trabalho: Cria e entra na pasta /app dentro do container
WORKDIR /app

# 3. Copia os arquivos de dependências para dentro da pasta /app
COPY package*.json ./

# 4. Instala todas as dependências declaradas no package.json
RUN npm install

# 5. Copia todo o resto do código da sua máquina para dentro do container
COPY . .

# 6. Porta: Informa que o container vai responder na porta 4200 (padrão do Angular)
EXPOSE 4200

# 7. Comando de execução: O que o container executa quando for iniciado
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
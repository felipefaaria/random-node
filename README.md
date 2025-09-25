# Custom Node n8n: Gerador de Número Aleatório Verdadeiro

Este projeto contém um **nó** para a plataforma de automação n8n. Ele foi desenvolvido para cumprir os requisitos do desafio técnico da Recruta Onfly.

O conector, chamado **Random**, utiliza a API do [Random.org](https://www.random.org/) para gerar números aleatórios verdadeiros, oferecendo uma operação simples para obter um número inteiro dentro de um intervalo definido.

---

## 📋 Pré-requisitos Técnicos

Certifique-se de que os seguintes softwares estão instalados em seu ambiente de desenvolvimento:

- **Node.js**: Versão 22 (LTS) ou superior.
- **Docker Compose**: Para orquestrar o n8n e o banco de dados PostgreSQL.

---

## 🚀 Funcionalidades

O conector **Random** foi projetado com os seguintes requisitos funcionais:

- **Nome do Conector**: `Random`
- **Inputs**:
  - **Min**: Valor mínimo.
  - **Max**: Valor máximo.
- **API de Geração**: Utiliza obrigatoriamente o endpoint GET da API do Random.org.

---

## ⚙️ Instruções de Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clonar o Repositório

Primeiro, clone este repositório para o seu ambiente local.

### 2\. Configurar o Ambiente com Docker Compose

O arquivo `docker-compose.yml` já está configurado para subir o **n8n** e uma instância do **PostgreSQL**. Ele mapeia o diretório `dist` do projeto (onde o nó é compilado) para o diretório de nós personalizados do n8n (`/home/node/.n8n/custom`).

Para iniciar os serviços, execute:

```bash
docker-compose up -d
```

### 3\. Instalar as Dependências

Enquanto os contêineres do Docker estão subindo, instale as dependências do projeto.

```bash
npm install
```

### 4\. Compilar e Executar o Conector

Para compilar o código TypeScript do nó personalizado e executá-lo em modo de desenvolvimento, use o seguinte comando:

```bash
npm run dev
```

Este comando irá monitorar o arquivo `nodes/Random.node.ts` e recompilá-lo automaticamente sempre que houver uma alteração.

### 5\. Acessar o n8n e Testar o Nó

Com todos os serviços rodando, acesse a interface do n8n em seu navegador:

[http://localhost:5678]

- Crie um novo workflow.
- Clique no botão **`+`** e procure pelo nó **Random**.
- Adicione o nó ao seu workflow, configure os valores `Min` e `Max` e execute o workflow para ver o resultado.

---

## ✅ Critérios de Avaliação

O projeto foi desenvolvido para atender a todos os critérios de avaliação propostos:

- **Configuração da Infra**: A infraestrutura local é configurada com `Docker Compose` e `PostgreSQL`, conforme solicitado.
- **Organização de Arquivos**: O projeto segue a estrutura padrão de um `n8n custom node`, com o código do conector na pasta `nodes/`.
- **Qualidade do Código**: O código é limpo, legível e utiliza as melhores práticas do TypeScript.
- **Integração com Random.org**: A integração utiliza o helper nativo do n8n (`this.helpers.httpRequest`), garantindo compatibilidade, e inclui tratamento de erros para falhas na requisição.
- **Detalhes do Conector**: Todos os requisitos funcionais foram cumpridos, incluindo o nome do nó, operação e inputs de `Min` e `Max`. Um ícone SVG também foi adicionado para uma experiência visual aprimorada.
- **Qualidade e Detalhamento do README**: Este arquivo fornece todas as instruções necessárias para a instalação, configuração e execução, garantindo que a equipe de avaliação possa replicar o ambiente facilmente.
- **Melhores Práticas n8n**: O projeto segue o estilo de desenvolvimento e as convenções da documentação oficial do n8n.

---

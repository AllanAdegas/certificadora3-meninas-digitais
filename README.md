# Gerenciador de Eventos Meninas Digitais UTFPR-CP
<div align="center">
  <img src="./src/app/logo.png" alt="Meninas Digitais UTFPR-CP" width="350"/>
</div>



## Colaboradores

- Allan Simões Adegas [@AllanAdegas](https://github.com/AllanAdegas)
- Arthur Massuia Miranda [@ArthurM09](https://github.com/ArthurM09)
- Matheus de Bortoli Pastega [@pastega](https://github.com/pastega)



## Descrição do Projeto

O sistema proposto tem como objetivo facilitar o agendamento e gerenciamento de eventos como minicursos e oficinas, 
promovidos pelo projeto Meninas Digitais. Ele automatizará tarefas, aprimorando a organização e comunicação com as 
participantes. 

Com uma interface intuitiva e funcionalidades integradas, o sistema auxiliará a equipe na criação
e gestão de eventos, no controle de inscrições, na comunicação com inscritas e na geração
de relatórios e certificados.

### Funcionalidades Principais:
1. **Gerenciamento de Eventos**  
   - Criação, edição e cancelamento de eventos;  
   - Visualização de eventos em um calendário.  

2. **Gerenciamento das Inscrições**  
   - Visualização dos inscritos por evento.
   - Opção para inscrever-se nos eventos.
   - Opção para desinscrever-se dos eventos.


## Repositório no GitHub
Link do [Repositório Oficial](https://github.com/AllanAdegas/certificadora3-meninas-digitais)


## Tecnologias Utilizadas

- **Frontend**: ReactJS, Next.js, Material-UI, TailwindCSS  
- **Backend**: Node.js com Firebase (Firestore e Authentication)  
- **Banco de Dados**: Firestore  
- **Roteamento**: Next.js App Router  
- **Estilização**: TailwindCSS e Material-UI  
- **Ferramentas Auxiliares**: ESLint para padronização de código  

## Instalação e Configuração

### Vídeo de instalação das ferramentas
- https://drive.google.com/file/d/1IV_HweDCbll9-9r9UBiv1DpdYiSFt8dT/view?usp=drive_link

### Pré-requisitos:
- Node.js (v22 LTS);
- NPM ou Yarn;
- Conta no Firebase para configuração do backend.

### Passos para Configuração:
1. **Clone o Repositório**
   ```bash
   git clone https://github.com/AllanAdegas/Jorge-Certificador3
2. **Instale as Dependências**
   ```bash
   npm install
   ou
   yarn install
3. **Configuração do Firebase**
   - Crie um projeto no Firebase Console;
   - Habilite Authentication e Firestore Database;
   - Adicione o arquivo .service_account.json na pasta src/lib/firebase/service_account/ 
   - Configure o arquivo .env.local na raiz do projeto com as chaves de configuração do Firebase:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
4. **Execute o Servidor**
   ```bash
   npm run dev
   ou
   yarn dev
5. **Para acessar o sistema, abra o navegador e va até** http://localhost:3000



## Como Usar o Sistema

### Cadastro/Login
- Acesse a página de cadastro e crie uma conta;
- Realize o login na página específica.

### Criação de eventos
- Acesse o painel administrativo (dashboard) e clique em "Criar Novo Evento";
- Preencha as informações como: título, data, descrição e status.

### Edição de eventos
- Acesse o painel administrativo (dashboard) e clique em "Editar" no card do evento;
- Edite as informações como: título, data, descrição e status.

### Exclusão de eventos
- Acesse o painel administrativo (dashboard) e clique em "Detalhes" no card do evento;
- Na página de detalhes clique no botão "Excluir Evento".
- Na página de detalhes também é possível editar o evento.

### Calendário de eventos
- Acesse e recarregue a página do calendário;
- Vizualize os eventos ativos de forma mensal, semanal e diária.

### Inscrição em eventos
- Acesse a página "Client" pelo sidebar.
- Em "Eventos Disponíveis" se inscreva no evento escolhido.
- Em "Eventos Inscritos" é possível de desinscrever dos eventos.

### Relatórios
- Acompanhe o número de eventos ativos.

### Observação
- Para ter acesso ao painel administrativo (dashboard) e ao gerenciamento de usuários (users) deve-se ter o cargo de admin.

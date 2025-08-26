# Flextotal - Gestão de Projetos Moderna

Flextotal é uma plataforma de gestão de projetos moderna e poderosa, inspirada nas funcionalidades robustas do Redmine, mas com uma interface de usuário contemporânea e intuitiva. Construída com as tecnologias mais recentes, a aplicação visa otimizar o fluxo de trabalho de equipes de desenvolvimento, QA, suporte e gestão.

## ✨ Principais Funcionalidades

- **Dashboard de Controle:** Visualize métricas e o progresso dos projetos através de gráficos interativos (barras, pizza, linhas).
- **Quadro Kanban:** Gerencie o fluxo de trabalho das tarefas com um quadro Kanban visual e fácil de usar.
- **Cronograma (Gantt):** Planeje e acompanhe a linha do tempo do projeto com uma visualização de Gráfico de Gantt.
- **Gestão de Tarefas Completa:** Crie, edite e gerencie tarefas com detalhes como prioridade, status, responsável, anexos e comentários.
- **Checklist de Subtarefas:** Quebre tarefas complexas em subtarefas gerenciáveis dentro de um mini-kanban.
- **Chat QA/Dev Flutuante:** Facilite a comunicação rápida entre QA e Desenvolvedores diretamente na tarefa, evitando reaberturas desnecessárias.
- **Apontador de Horas:** Registre o tempo trabalhado em cada tarefa com um cronômetro integrado.
- **Páginas por Equipe:** Seções dedicadas para as equipes de QA e Tech Leads, com ferramentas e filtros específicos para suas necessidades.
- **Gerenciamento de Projetos e Wikis:** Organize projetos para diferentes clientes, cada um com sua própria Wiki e área de documentos, além de uma Wiki interna global.
- **Inteligência Artificial:** Utilize IA para gerar resumos de tarefas adaptados para públicos distintos (gerencial e técnico).

## 🚀 Tecnologias Utilizadas

- **Framework:** [Angular](https://angular.dev/) (v18+)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** Componentes customizados (standalone) inspirados em [ShadCN UI](https://ui.shadcn.com/)
- **IA Generativa:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit) (integrado via API)
- **Gráficos:** [NGX-Charts](https://swimlane.github.io/ngx-charts/)

## ⚙️ Como Executar o Projeto Localmente

1.  **Instalar o Angular CLI (se ainda não tiver):**
    ```bash
    npm install -g @angular/cli
    ```

2.  **Instalar as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    No Angular, as variáveis de ambiente são gerenciadas nos arquivos `src/environments/`. Copie o conteúdo de `environment.ts` para `environment.local.ts` (ou edite diretamente) e preencha as variáveis necessárias, como a URL da API ou a chave do Genkit.

4.  **Executar o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```
    Abra [http://localhost:4200](http://localhost:4200) no seu navegador para ver a aplicação.

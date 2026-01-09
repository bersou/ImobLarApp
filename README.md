# 🏠 ImobLar - Plataforma de Imóveis

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.24-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Uma aplicação moderna e elegante para busca e gerenciamento de imóveis.**

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Scripts](#-scripts-disponíveis)

</div>

---

## 📱 Sobre o Projeto

**ImobLar** é uma aplicação web responsiva desenvolvida para facilitar a busca e visualização de imóveis. Com uma interface intuitiva e animações fluidas, oferece uma experiência premium para usuários que buscam comprar, alugar ou anunciar imóveis.

## ✨ Funcionalidades

- 🔍 **Busca Inteligente** - Pesquise imóveis por localização, tipo ou características
- 🏷️ **Filtros por Categoria** - Filtre por casa, apartamento, comercial e mais
- ❤️ **Favoritos** - Salve seus imóveis preferidos para ver depois
- 📱 **PWA** - Instale como aplicativo no seu dispositivo
- 🌙 **Modo Escuro** - Alternância entre temas claro e escuro
- 🗺️ **Integração com Mapas** - Visualize a localização dos imóveis
- 📷 **Galeria de Imagens** - Navegue pelas fotos com gestos de swipe
- 💬 **Mensagens** - Sistema de comunicação integrado
- 👤 **Perfil do Usuário** - Gerencie suas informações e preferências

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Descrição |
|------------|-----------|
| **React 18** | Biblioteca para construção de interfaces |
| **TypeScript** | Superset tipado do JavaScript |
| **Vite** | Build tool de próxima geração |
| **TailwindCSS** | Framework CSS utilitário |
| **shadcn/ui** | Componentes acessíveis e customizáveis |
| **Framer Motion** | Biblioteca de animações |
| **React Router** | Roteamento para aplicações SPA |
| **React Query** | Gerenciamento de estado assíncrono |
| **Zod** | Validação de schemas |

### Outras Bibliotecas
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos interativos
- **Embla Carousel** - Carrosséis responsivos
- **date-fns** - Manipulação de datas
- **React Hook Form** - Gerenciamento de formulários

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm ou yarn

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/berfrancisco/ImobLarApp.git

# 2. Acesse a pasta do projeto
cd ImobLarApp

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza build de produção |
| `npm run lint` | Executa verificação de código |

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
│   ├── ui/         # Componentes base (shadcn/ui)
│   └── ...         # Componentes customizados
├── pages/          # Páginas da aplicação
├── hooks/          # Custom hooks
├── data/           # Dados mockados
├── lib/            # Utilitários e configurações
└── assets/         # Recursos estáticos
```

## 🚀 Deploy

A aplicação pode ser facilmente implantada em plataformas como:

- **Vercel** - `npx vercel`
- **Netlify** - `npm run build` e arraste a pasta `dist`
- **GitHub Pages** - Configure o workflow de CI/CD

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

<div align="center">

Feito com ❤️ por **Bernardo Francisco**

</div>

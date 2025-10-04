// Portuguese (Brazil) translations
export const translations = {
  // Header
  appTitle: "Rastreador de Enxoval",
  appSubtitle: "Planeje sua casa nova em conjunto",

  // Navigation
  dashboard: "Painel",
  allItems: "Todos os Itens",

  // Stats
  totalItems: "Total de Itens",
  purchased: "Comprados",
  remaining: "Faltam",
  totalBudget: "Orçamento Total",

  // Categories (keeping English keys for data consistency)
  categories: {
    Kitchen: "Cozinha",
    "Living Room": "Sala de Estar",
    Bedroom: "Quarto",
    Bathroom: "Banheiro",
    Laundry: "Lavanderia",
    "Dining Room": "Sala de Jantar",
    "Home Office": "Escritório",
    Outdoor: "Área Externa",
    General: "Geral",
  },

  // Status
  status: {
    "Not Purchased": "Não Comprado",
    "In Progress": "Em Andamento",
    Purchased: "Comprado",
  },

  // Priority
  priority: {
    High: "Alta",
    Medium: "Média",
    Low: "Baixa",
  },

  // Actions
  addItem: "Adicionar Item",
  editItem: "Editar Item",
  deleteItem: "Excluir Item",
  cancel: "Cancelar",
  save: "Salvar",
  update: "Atualizar Item",
  delete: "Excluir",
  clearFilters: "Limpar filtros",

  // Table headers
  itemName: "Item",
  room: "Cômodo",
  statusLabel: "Status",
  priorityLabel: "Prioridade",
  estimatedCost: "Custo Estimado",
  actualCost: "Custo Real",
  quantity: "Quantidade",
  notes: "Observações",
  actions: "Ações",

  // Filters
  searchItems: "Buscar itens...",
  allCategories: "Todas as Categorias",
  allPriorities: "Todas as Prioridades",
  allStatuses: "Todos os Status",

  // Messages
  noItemsFound: "Nenhum item encontrado",
  showingItems: "Mostrando {count} de {total} itens",
  notesCount: "{count} Itens",
  completedCount: "{count} Comprados",

  // Dialog
  addNewItem: "Adicionar Novo Item",
  editItemTitle: "Editar Item",
  itemNamePlaceholder: "Nome do item",
  selectCategory: "Selecione a categoria",
  selectPriority: "Selecione a prioridade",
  selectStatus: "Selecione o status",
  notesPlaceholder: "Adicione observações...",

  // Auth
  login: "Entrar",
  signup: "Cadastrar",
  logout: "Sair",
  email: "E-mail",
  password: "Senha",
  loginTitle: "Entre na sua conta",
  signupTitle: "Crie sua conta",
  noAccount: "Não tem uma conta?",
  hasAccount: "Já tem uma conta?",
  loginButton: "Entrar",
  signupButton: "Criar conta",
  loggingIn: "Entrando...",
  signingUp: "Criando conta...",
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

# API de serviço para gerenciamento de estoque

## Descrição

API Backend para transacionar os emprestimos feitos em sistema de backend de aplicação senai

## Estrutura

### Arquitetura

Baseando-se em principio de isolação de arquitetura de software e clean architeture definimos que a aplicação será voltada ao dominio de depositos, desa forma usaremos TDD, BDD e DDD como principios de desenvolvimento

### Layout de pastas

As camadas de pasta implemetarão unica responsabilidade definida pela seguinte estrutura de pastas

```
+-- core
|   +-- entity
|   +-- domain
|   |   +-- validation
+-- adaptors
+-- usecase
+-- infra
|   +-- database
|   |   +-- firebase
|   +-- repositories
+-- shared
|   +-- utils
```

#### Entidades

São as entidades descritas pelo seguinte diagrama

<img src="./resources/class.svg" />

## Requisitos

Para cada funcionalidade e entidade temos a nossa lista de requisitos, ou seja de varacterísticas a serem entregues

### item

- [x] deve ser sempre associado a um storage
- [x] o nome é obrigatório
- [x] não pode exceder um storage
- [x] o storage indicado deve estar disponivél

### storage

- [ ] possui um nome obrigatório
- [ ] pode possuir um storage filho
- [ ] possui uma capacidade máxima
- [ ] um storage não precisa ter itens
- [ ] possui um status
  - [ ] ativo
  - [ ] cheio
  - [ ] desativado
  - [ ] em manutenção

### transação

- [x] possui um item de referência
- [x] possui um usuário de referẽncia
- Retirada
  - [x] não altera a quantidade de itens no storage quando for uma retirada
- Devolução
  - [ ] somente quem retirou ou um admin pode devolver o item
- [x] Listar todos as retiradas de um usuário
- [ ] listar todas as devoluções recentes de um usuário
- [x] listar todas os items em empréstimo a um usuário (disponiveis para devolver)
- [ ] buscar todos os itens disponiveis para a retirada

### Usuário

- [ ] Precisa ter um email
- [ ] Pode ou não ser um admin
- [ ] Precisa de uma senha hasheada

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
```

#### Entidades

São as entidades descritas pelo seguinte diagrama

<img src="./resources/class.svg" />

## Requisitos

Para cada funcionalidade e entidade temos a nossa lista de requisitos, ou seja de varacterísticas a serem entregues

### item

[X] deve possuir categoria válidaa  
[X] deve ser sempre associado a um storage  
[X] o nome é obrigatório  
[X] não pode exceder um storage  
[X] o storage indicado deve estar disponivél

### categoria

[] deve possuir um nome único

### storage

- [x] possui um nome obrigatório
- [] pode possuir um storage filho
- [x] possui uma capacidade máxima
- [x] um storage não precisa ter itens
- [x] possui um status
  - [x] ativo
  - [x] cheio
  - [x] desativado
  - [x] em manutenção

### transação

- [x] possui um item de referência
- [x] possui um usuário de referẽncia
- Retirada
  - [x] não altera a quantidade de itens no storage quando for uma retirada
  - [] possui uma data de expiração (limite)
- Devolução
  - [] somente quem retirou ou um admin pode devolver o item

### Usuário

- [] Precisa ter um email
- [] Pode ou não ser um admin
- [] Precisa de uma senha hasheada

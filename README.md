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
|   +-- port
|   |   +-- repositories
|   |   |   +-- firebase
```

#### Entidades
São as entidades descritas pelo seguinte diagrama
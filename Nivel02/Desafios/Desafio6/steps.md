## Pacotes

## Processos

1. Rode a seguinte migration => yarn typeorm migration:create -n CreateTransactions
2. yarn typeorm migration:create -n CreateCategories
3. yarn typeorm migration:create -n AddCategoryIdToTransactions
4. yarn typeorm migration:run || revert

## Anotações

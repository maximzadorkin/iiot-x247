### Необходимые переменные для работы компонента:
  - heightList
    * type: string
    * description: высота списка
  - canClose
    * type: boolean
    * description: возможно ли закрыть компонент
  - Close (optional)
    * type: func
    * description: что и как делать при закрывании
  - title
    * type: string
    * descritopn: заголовок компонента
  - onChangeHandler
    * type: func
    * description: что делать при изменении содержимого input
  - getInputValue
    * type: string
    * description: получить отображаемое value для input
  - getList
    * type: array string
    * description: получить список для вывода

### Описание методов
- getActiveList
    params: null
    description: генерирует элемента списка 
- 
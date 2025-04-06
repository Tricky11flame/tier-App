# vite-env.d.ts 
>   what does it do ? it had a very simple line

# types.ts 
    Id , color , column , Task

# main.tsx 
>   BrowserRouter
>   React.StrictMode
    basic file nothing much to talk about

# index.css
>   empty??

# App.tsx !!!
>   Routers , Route from react-router-dom
    Gives out <KanbanBoard/> @ "/"

# App.css
>    3 monkies of tailwind
>   -webkit-scrollbar , -webkit-scrollbar:horizontal ,-webkit-scrollbar-thumb , .task> -webkit-scrollbar-thumb
    applies scrolling to major components
    used to implement tailwind

# ./scripts(1) > lmao.js
> idk why is it being used i think it would be an issue of tailwind css
> nvm it its ok
    generate a a string of color and power

# ./icons(3) > PulsIcon PokeIcon TrashIcon
 they use svg and drawing to make  a icon 
> interesting approach  if you ask me
> totally imported

# ./constants(2) > defaultCols defaultTasks
> fair enough pretyu simple code 

# ./components(4) > TheVoid TaskCard KanbanBoard ColumnContainer
> ahh the most anxiety driving component in my whole code base :p

## TheVoid.tsx
    dnd-kit/sortable
        SortableContext : 
        useSortable() : 
    dnd-kit/utilities
        CSS :
    useMemo() in react
        task.id
        creates a memo of id from tasks objects
    ./Components
        TaskCard.tsx
    ./types
        Column , Id , Task
    
    define the props type for the root components
    interface prop 
        Column,function(Id),Task[]
    
### destructure the useSortable
        useSortable
            id , {type,column}  ->  
                setNodeRef,transform,transition
        setNodeRef
        transform
        transition

    style object  
        transition , transform
### DOM strcuture 
        Col Title
        Task Flex
            SortableContext 
                taskIds: taskId[] < from useMemo() >
                maps task -> Card
                    key , task , deleteTask
        




## TaskCard
    useSate()
    Id,Task
    dnd-kit/sortable
        useSortable()
    dnd-kit/utilities
        CSS
    
    useState
        mouseIsOver : boolean
        editMode : boolean
    
### useSortable
    deconstruction: 
        attributes < new >
        listeners < new >
        transform
        tranition
        isDragging < new >
    params:
        id, data , disabled (editMode)
    toggleEditMode

    isDragging :
        this is interesting but works !!! 
    otherwise :
        VisibleTask
            onClick
            className
            ref !!!
            attributes deconstruction !!!
            listeners destructuction !!!
            onMouseEnter
            onMouseLeave

            <img>
            mouseIsOver? <Trash Button>

## KanbanBoard
    react
        useEffect!!! useMemo useState
    axios
    dnd-kit/core !!!
        DnDContext
        DragEndEvent
        DragOverlay
        DragStartEvent
        PointerSensor
        useSensor
        useSensors
    dnd-kit/sortable
        SortableContext
        arrayMove
    
    wtf is useEffect doingggg!!! T-T
    States
        columns tasks activeColumn activeTask
    Memo
        Colums.Id[]
    sensor : using dnd-kit/core sensor tools !!!
  
  return<>
    fullBoard
        DndContext : sensors onDragStart onDragEnd onDragOver
            SortableContext :item=ColId ,maps ColContainer with element c in cols
            TheVoid

            Create Button
            Save Button

            DragOverlay
                activeColumn? ColContainer
                activeTask? TaskCard
    </>

  functions 
    deleteTask()
    ...
    createNewColumn()
    deleteColumn()
    updateColumn()
    ...
    *onDragStart()   !!!
    *onDragEnd()     !!!
    *onDragOver()    !!!
    ...
    generateId()
    saveData()

## ColumnContainer
    dnd-kit/sortable
        SortableContext useSortable
    dnd-kit/utilities
        CSS
    States
        editMode
    Memos
        task.Id[]
    
    useSortbale .. destructuring it 
        setNodeRef
        attributes !!!
        listeners !!!
        transform
        transition
        isDragging

isDragging?
    < ghost tag > !!!
otherwise
    root : ref style className
        ColTitle : ...attributes ...listeners
            Flex
                Btn2toggleEditMode
                    edit title !!!
                ... wierd functionalities !!!
                Del Btn
            Flex
                sortableContext items:taskId
                    maps </ TaskCard> with task




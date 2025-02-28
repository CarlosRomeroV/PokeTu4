export function translateType(type:string):string{
    type=type.toLowerCase()
    
    if (type=='water') return 'Agua'
    if (type=='fire') return 'Fuego'
    if (type=='plant') return 'Planta'
    if (type=='fairy') return 'Hada'
    if (type=='psychic') return 'Psíquico'
    if (type=='colorless') return 'Normal (energía básica)'
    if (type=='metal') return 'Acero'
    if (type=='fighting') return 'Lucha'
    if (type=='darkness') return 'Oscuridad'
    if (type=='dragon') return 'Dragón'
    if (type=='lightning') return 'Rayo'
    
    return type;
}

export function translateStage(stage:string):string{
    stage=stage.toLowerCase()
    
    if (stage=='basic') return 'Básica (primera forma)'
    if (stage=='stage 1') return 'Etapa 1 (segunda forma)'
    if (stage=='stage 2') return 'Etapa 2 (tercera forma)'
    if (stage=='ex') return 'EX'

    return stage;
}
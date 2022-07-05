import { useCallback, useEffect, useState } from 'react';
import { ApiException } from '../../shared/services/api/ApiException';
import { ITarefa, TarefasService } from '../../shared/services/api/tarefas/TarefaService';


export const Dashboard = () => {
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
        TarefasService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista(result);
                }
            });
    }, []);
    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value

            e.currentTarget.value = ''

            if (lista.some((listItem) => listItem.title === value)) return

            TarefasService.create({
                title: value,
                isCompleted: false
            }).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldList) => [...oldList, result])
                }
            })
        }
    }, [lista])

    const handleTogleComplete = useCallback((id: number) => {
        const tarefaToUpdate = lista.find((tarefa) => tarefa.id === id)
        if (!tarefaToUpdate) return

        TarefasService.updateById(id, {
            ...tarefaToUpdate,
            isCompleted: !tarefaToUpdate.isCompleted,
        }).then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setLista(oldList => {
                    return oldList.map(oldListItem => {
                        if (oldListItem.id === id) return result
                        return oldListItem
                    })
                })
            }
        })
    }, [lista])

    const handleTogleDelete = useCallback((id: number) => {
        TarefasService.deleteById(id)
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista(oldList => {
                        return oldList.filter(oldListItem => oldListItem.id !== id)
                    })
                }
            })
    }, [])

    return (
        <div>
            <p>Lista</p>

            <input
                onKeyDown={handleInputKeyDown}
            />

            <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>

            <ul>
                {
                    lista.map((listItem) => {
                        return <li key={listItem.id}>
                            <input type="checkbox"
                                checked={listItem.isCompleted}
                                onChange={() => handleTogleComplete(listItem.id)}
                            />
                            {listItem.title}
                            <button onClick={() => handleTogleDelete(listItem.id)}>Apagar</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
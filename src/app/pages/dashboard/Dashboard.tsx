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

            setLista((oldList) => {

                if (oldList.some((listItem) => listItem.title === value)) return oldList

                return [...oldList, {
                    id: oldList.length,
                    title: value,
                    isCompleted: false
                }]
            })
        }
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
                                onChange={() => {
                                    setLista(oldList => {
                                        return oldList.map(oldListItem => {
                                            const newisCompleted = oldListItem.title === listItem.title
                                                ? !oldListItem.isCompleted
                                                : oldListItem.isCompleted
                                            return {
                                                ...oldListItem,
                                                isCompleted: newisCompleted,
                                            }
                                        })
                                    })
                                }}
                            />
                            {listItem.title}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
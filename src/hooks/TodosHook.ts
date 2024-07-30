"use client";

import { getTodos } from "@/actions/todoActions";
import { todoType } from "@/types/todoType";
import { useQuery } from "@tanstack/react-query";

const TodosHook = () => {
    const { data: todos, isLoading, error } = useQuery<todoType[], Error>({
        queryKey: ['todos'],
        queryFn: getTodos,
    });
    return{
        todos,
        isLoading,
        error
    }
    
}
export default TodosHook;
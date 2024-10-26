import { RefObject, useEffect } from "react";

/* Outro spaghetti criado para resolver um problema simples
    -> poderia ter usado useState com a prop onBlur como aqui no react basico: 
    https://github.com/leowbk77/tic_react_basico/blob/main/src/components/TaskList/TaskListItem/TaskListItem.jsx
*/

export const useOnClickOutside = (
    ref: RefObject<HTMLUListElement>,
    handler: (params: unknown) => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if(!ref.current || ref.current.contains(event.target as Node)){
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        }

    }, [ref, handler]);
};
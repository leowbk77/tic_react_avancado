import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
    base: "rounded bg-gray-200 w-full p-2 outline-none"
});

type InputProps = ComponentProps<"input">;

const Input = ({onChange, ...props}: InputProps) => {
    return (
    <div>
        <input type="text" name="" id="" placeholder="Search..." className={inputVariants.base} onChange={onChange} {...props}/>
    </div>
    );
};

export default Input;
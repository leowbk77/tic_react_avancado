import { ComponentProps,  } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

/*
    Componente de botao que usa 
    tailwind merge -> serve para mesclar classes conflitantes do tailwind
    tailwind-variants -> serve para criar variacoes de estilo
    O botão recebe suas props e elas são mescladas usando estas libs
    Parece desnecessariamente complexo.
*/

// constante para definir as variacoes de estilos do componente.
const buttonVariants = tv({
    variants: {
        variant: {
            primary: "w-full rounded bg-blue-500 py-2 px-4 hover:bg-blue-700 hover:text-white",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

// tipagem dos parametros do componente
type PropsButton = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

// botao com os props
const Button = ({className, children, variant, ...props}: PropsButton) => {
    // constante que recebe o merge da variante com outras propriedades passadas
    const classButton = twMerge(buttonVariants({variant}), className);

    return (                // botao estilizado aqui
        <button className={classButton} {...props}>
            {children}
        </button>
    );
};

export default Button;
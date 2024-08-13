import { tailwindCMerge } from "../../utils/TailwindcsMerge";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
//custom componenet el hoa el variant b 5 toro2
export const buttonVariants = cva("inline-flex items-center justify-center font-extrabold transition duration-200 ", {
  variants: {
    variant: {
      primary: "bg-white text-black  hover:bg-gray-800 hover:border-0 hover:text-slate-50 shadow-md",
      outline: "bg-transparent hover:bg-black text-black hover:text-white border border-gray-300 hover:border-0 duration-0 ",
      destructive: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-400/40 ",
      ghost: "bg-black hover:bg-white text-white hover:text-black shadow-md",
      secondary: "bg-mainColor hover:bg-[#bcd358] text-black shadow-md",
    },
    size: {
      xs: "px-2 text-xs h-6",
      sm: "px-3 text-sm h-8",
      md: "px-4 text-md h-10",
      lg: "px-6 text-lg h-12",
    },
    fullWidth: {
      true: "w-full"
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: "md"
  },


})


interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
}

const Button = ({ className, children, variant, size, fullWidth, rounded, isLoading, ...rest }: IProps) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (isLoading !== undefined) {
      setLoading(isLoading);
    }
  }, [isLoading])

  return <>
    <motion.button
      whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
      whileTap={{ scale: 0.5 }}
      className={`${tailwindCMerge(buttonVariants({ variant, size, fullWidth, rounded }))} ${className} ${loading ? "opacity-70" : ""}`} {...rest as any} disabled={loading} >
      {loading ? <><span className='animate-spin'>  <Loader />  </span><span>Processing...</span> </> : children}

    </motion.button>
  </>
}

export default Button
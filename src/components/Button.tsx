"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  const baseStyles = "inline-flex h-14 items-center justify-center rounded-full px-8 font-medium transition-all duration-300 active:scale-95";
  
  const variants = {
    primary: "bg-accent text-black hover:bg-white hover:text-black shadow-lg shadow-accent/20",
    secondary: "bg-white text-black hover:bg-accent hover:text-white",
    outline: "border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

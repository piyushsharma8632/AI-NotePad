import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
<<<<<<< HEAD
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariants } from "./button-variants";

=======
import { buttonVariants, type ButtonVariants } from "./button-variants";
import { cn } from "@/lib/utils";

// Define props interface
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
}

<<<<<<< HEAD
=======
// Create the Button component
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

<<<<<<< HEAD
export { Button };
=======
export { Button }; // Only export the Button component
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308

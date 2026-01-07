import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const avatarVariant = cva("", {
  variants: {
    size: {
      default: "h-9 w-9",
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-[160px] w-[160px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariant> {
  imgUrl: string;
  name: string;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar = ({
  imgUrl,
  name,
  className,
  size,
  onClick,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(avatarVariant({ size }), className)}
      onClick={onClick}
    >
      <AvatarImage className="object-cover" src={imgUrl} alt={name} />
    </Avatar>
  );
};

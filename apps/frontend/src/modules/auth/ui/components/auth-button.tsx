import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <Button
      variant={"outline"}
      className="rounded-full text-blue-700 px-4 py-2 font-medium hover:text-blue-700 hover:border-blue-100 hover:bg-blue-100"
    >
      <UserCircleIcon className="size-6" />
      Sign in
    </Button>
  );
};

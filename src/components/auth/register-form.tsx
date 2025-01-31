"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { registerAction } from "@/app/actions/userActions";
import { SubmitButton } from "../common/SubmitBtn";
import { useToast } from "@/hooks/use-toast";
import VerifyToken from "./VerifyToken";
import type { IState } from "@/types";

export function RegiserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // for zod erros
  const initState: IState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useActionState(registerAction, initState);
  const { toast } = useToast();

  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState<null | string>(null);
  useEffect(() => {
    if (state.status === 201) {
      toast({
        title: "Success",
        description: state.message,
      });
      setIsActive(true);
    }
    if (state.status >= 400) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
      setIsActive(false);
    }
  }, [state]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Clash</h1>
                <p className="text-balance text-muted-foreground">
                  Welcome to Clash.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <span className="text-sm text-red-500">
                  {state.errors?.name}
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-sm text-red-500">
                  {state.errors?.email}
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" id="password" required />
                <span className="text-sm text-red-500">
                  {state.errors?.password}
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  required
                />
                <span className="text-sm text-red-500">
                  {state.errors?.confirmPassword}
                </span>
              </div>

              <SubmitButton />

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>

          <div className="relative hidden bg-muted md:flex flex-col items-center justify-center">
            <Image src="/clash.svg" width={400} height={400} alt="clash_svg" />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      <VerifyToken
        isActive={isActive}
        email={email}
        setIsActive={setIsActive}
      />
    </div>
  );
}

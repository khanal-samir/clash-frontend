"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { IState } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "../common/SubmitBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "@/actions/userActions";
const ChangePass = () => {
  const sParms = useSearchParams();
  const initState: IState = {
    message: "",
    status: 0,
    errors: {},
  };
  const { toast } = useToast();
  const [state, formAction] = useActionState(changePassword, initState);
  const router = useRouter();
  useEffect(() => {
    if (state.status === 200) {
      toast({
        title: "Success",
        description: state.message,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
    if (state.status >= 400) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state]);
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            <Input
              name="token"
              type="hidden"
              value={sParms.get("token") ?? ""}
              readOnly
            />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Password Reset</h1>
                <p className="text-balance text-muted-foreground">
                  Enter new password for your clash account.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={sParms.get("email") ?? ""}
                  required
                  readOnly
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
                <span className="text-sm text-red-500">
                  {state.errors?.password}
                </span>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                />
                <span className="text-sm text-red-500">
                  {state.errors?.confirmPassword}
                </span>
              </div>

              <SubmitButton />

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
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
    </div>
  );
};

export default ChangePass;

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Lock, MessageCircleQuestionMark, Scroll, User } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signInService } from "@/services/auth";

const signInSchema = z.object({
  email: z.email({ error: "Digite um e-mail válido." }),
  password: z
    .string()
    .min(8, { error: "A senha deve conter ao menos 8 caracteres" }),
});

type SignIn = z.infer<typeof signInSchema>;

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Entrar | Domo",
      },
    ],
  }),
});

function RouteComponent() {
  const form = useForm<SignIn>({
    resolver: standardSchemaResolver(signInSchema),
  });

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signInService,
  });

  const submitForm: SubmitHandler<SignIn> = async (values) => {
    try {
      await signInFn({ ...values });
    } catch (err) {
      console.log("ERRO", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-between p-8">
      <h2 className="text-4xl lg:mr-auto">Logo DOMO</h2>

      <Form {...form}>
        <form
          className="flex w-full justify-center"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <Card className="w-full lg:max-w-lg">
            <CardHeader>
              <div className="justify-cente flex w-full flex-col items-center gap-6">
                <div className="border-primary/20 flex size-10 items-center justify-center rounded-full border">
                  <User className="fill-primary size-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-center text-2xl font-bold">Bem vindo</h3>

                  <span className="text-muted-foreground font-light">
                    É bom ve-lo novamente, faça o login.
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Endereço de e-mail"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="Sua senha"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox className="size-5" />
                  <span className="text-muted-foreground text-sm font-light">
                    Manter-me logado
                  </span>
                </div>

                <span className="text-primary text-sm font-semibold">
                  Esqueceu sua senha?
                </span>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex w-full items-center justify-center lg:justify-between">
        <span className="text-muted-foreground text-sm">
          Todos os direitos reservados. Domo 2025
        </span>

        <div className="hidden lg:block">
          <Button size="sm" variant="link">
            <Lock />
            Privacidade
          </Button>

          <Button size="sm" variant="link">
            <Scroll />
            Termos
          </Button>

          <Button size="sm" variant="link">
            <MessageCircleQuestionMark />
            Obter ajuda
          </Button>
        </div>
      </div>

      <DotPattern
        className={cn(
          "-z-10 hidden [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] lg:block",
        )}
      />
    </div>
  );
}

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useQuery } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRolesService } from "@/services/roles";

const schema = z.object({
  name: z.string({ error: "O nome do usuário é obrigatório" }),
  email: z.email({ error: "Digite um e-mail válido" }),
  password: z.string({ error: "A senha é obrigatória" }),
  role: z.string({ error: "O papél do usuário é obrigatório" }),
  cellPhone: z.string({ error: "O celular é obrigatório" }),
});

export type UserFormProps = z.infer<typeof schema>;

export function UserForm() {
  const form = useForm<UserFormProps>({
    resolver: standardSchemaResolver(schema),
  });

  const handleChange: SubmitHandler<UserFormProps> = async (values) => {
    console.log(values);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["roles[]"],
    queryFn: getRolesService,
    select: (res) => res.data ?? [],
  });

  return (
    <form
      onSubmit={form.handleSubmit(handleChange)}
      className="flex flex-col gap-4"
    >
      <Form {...form}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Endereço de e-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@company.com"
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
                <FormLabel>Senha de acesso</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="************"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="role"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Papel</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoading || !data?.length}
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue placeholder="Selecione um papel" />
                    </SelectTrigger>
                    <SelectContent>
                      {data &&
                        data.map((role) => {
                          return (
                            <SelectItem
                              key={role.id}
                              value={role.id}
                              className="capitalize"
                            >
                              {role.name}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="cellPhone"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(11) 11111-1111" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="mt-auto ml-auto space-x-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </div>
      </Form>
    </form>
  );
}

'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useModalStore} from "@/store/modal-slice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
// import { createFunnel } from "@/app/server/actions/funnels";

import router  from "next/router";

const funnelSchema = z.object({
  funnelName: z.string().min(3, "O nome do funil deve ter pelo menos 3 caracteres."),
});

type FunnelFormData = z.infer<typeof funnelSchema>;

export const ModalNewFunnel: React.FC = () => {
  const { modal, closeModal } = useModalStore();
  const { register, handleSubmit, formState: { errors } } = useForm<FunnelFormData>({
    resolver: zodResolver(funnelSchema),
  });

  const onSubmit = (data: FunnelFormData) => {
    const formData = new FormData();
    formData.append("funnelName", data.funnelName);
    // createFunnel(formData);

    router.push("/funnels");
    closeModal();
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Funil</DialogTitle>
          <DialogDescription className=" text-zinc-400" >Adicione um novo funil para organizar seus leads.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nome do funil"
            {...register("funnelName")}
          />
          {errors.funnelName && (
            <p className="text-red-500 text-sm mt-1">{errors.funnelName.message}</p>
          )}
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
            <Button type="submit" className="bg-blue-500 text-white">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
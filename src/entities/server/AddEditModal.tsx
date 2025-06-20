"use client";

import { useState, useEffect } from "react";
import { Button, Dialog, Portal, CloseButton } from "@chakra-ui/react";
import CopyableCodeBlock from "@/shared/ui/CopyableCodeBlock";
import ServerForm from "@/features/server/Form";
import { useAddServerMutation } from "@/shared/hooks/servers/useAddServerMutation";
import { useEditServerMutation } from "@/shared/hooks/servers/useEditServerMutation";
import { validateForm } from "@/shared/utils/validateForm";
import { ServerModel, ServerFormValues } from "@/shared/types/server.type";
import { getErrorMesage } from "@/shared/utils/getErrorMessage";
import { UseFormSetError } from "react-hook-form";

interface AddEditServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  defaultValues?: ServerModel;
}

const nodeExporterConfig = 
`services:
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9123:9100"
    restart: unless-stopped
    command:
      - '--path.rootfs=/host'
    volumes:
      - '/:/host:ro,rslave'`;

export default function AddEditModal({ isOpen, onClose, isEdit = false, defaultValues }: AddEditServerModalProps) {
  const [generalError, setGeneralError] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(1);
  }, [isOpen, isEdit]);

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const addMutation = useAddServerMutation({
    onSuccess: handleClose,
  });
  const editMutation = useEditServerMutation({
    onSuccess: handleClose,
  });

  const handleServerFormSubmit = (data: ServerFormValues, setError: UseFormSetError<ServerFormValues>) => {
    if (isEdit && defaultValues?.id) {
      editMutation.mutate(
        { ...data, id: defaultValues.id },
        {
          onError: (error) => {
            validateForm(error, setError);
            const msg = getErrorMesage(error);
            if (msg) setGeneralError(msg);
          },
        }
      );
    } else {
      addMutation.mutate(data, {
        onError: (error) => {
          validateForm(error, setError);
          const msg = getErrorMesage(error);
          if (msg) setGeneralError(msg);
        },
      });
    }
  };

  const DialogFooter = () => {
    return step === 1 && !isEdit ? (
      <>
        <Button variant="ghost" mr={3} onClick={handleClose}>
          Отмена
        </Button>
        <Button colorScheme="blue" onClick={() => setStep(2)}>
          Далее
        </Button>
      </>
    ) : (
      <>
        <Button variant="ghost" mr={3} onClick={() => (isEdit ? handleClose() : setStep(1))}>
          {isEdit ? "Отмена" : "Назад"}
        </Button>
        <Button
          colorScheme="blue"
          form="server-form"
          type="submit"
          loading={addMutation.isPending || editMutation.isPending}
        >
          Готово
        </Button>
      </>
    );
  };

  const DialogContent = () => {
    return step === 1 && !isEdit ? (
      <div>
        <p>
          Для сбора метрик с сервера потребуется установить Node Exporter. Убедитесь, что на сервере установлен Docker и
          Docker Compose, а выбранный порт открыт для входящих соединений.
          <br />
          <br />
          Ниже приведён пример конфигурации Docker Compose для запуска Node Exporter:
        </p>
        <CopyableCodeBlock code={nodeExporterConfig} />
      </div>
    ) : (
      <ServerForm
        key={step}
        defaultValues={defaultValues}
        isLoading={addMutation.isPending || editMutation.isPending}
        onSubmit={handleServerFormSubmit}
        generalError={generalError}
      />
    );
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{isEdit ? "Редактировать сервер" : "Добавить сервер"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <DialogContent />
            </Dialog.Body>
            <Dialog.Footer>
              <DialogFooter />
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton onClick={handleClose} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

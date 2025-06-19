"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: BaseModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 animate-fadeIn" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full h-[80vh] max-w-md sm:max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 focus:outline-none">
          {title && (
            <Dialog.Title className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100 opacity-85">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </Dialog.Description>
          )}
          <div className="flex flex-col gap-3">{children}</div>
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none hover:cursor-pointer"
              type="button"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

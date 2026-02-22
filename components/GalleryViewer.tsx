'use client';

import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { galleryImages } from '@/lib/content';

export function GalleryViewer() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {galleryImages.map((image) => (
        <Dialog.Root key={image.src}>
          <Dialog.Trigger asChild>
            <button className="group relative overflow-hidden rounded-xl border border-border">
              <Image src={image.src} alt={image.alt} width={900} height={600} className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 text-left text-sm text-white">{image.caption}</div>
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-black p-3">
              <Image src={image.src} alt={image.alt} width={1400} height={900} className="h-auto w-full rounded-lg object-cover" />
              <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                <Dialog.Title>{image.caption}</Dialog.Title>
                <Dialog.Close className="rounded-full border border-border p-2">
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}

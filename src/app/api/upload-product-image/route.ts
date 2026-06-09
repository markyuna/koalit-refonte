// src/app/api/upload-product-image/route.ts

import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const BUCKET_NAME = "product-images";

function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Aucun fichier reçu." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Le fichier doit être une image." },
        { status: 400 }
      );
    }

    const fileExtension = file.name.split(".").pop() ?? "webp";
    const safeFileName = sanitizeFileName(file.name);
    const storagePath = `${crypto.randomUUID()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Erreur upload image produit:", uploadError);

      return NextResponse.json(
        { error: "Impossible d'uploader l'image." },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

    return NextResponse.json({
      url: publicUrl,
      path: storagePath,
      extension: fileExtension,
    });
  } catch (error) {
    console.error("Erreur API upload-product-image:", error);

    return NextResponse.json(
      { error: "Une erreur est survenue pendant l'upload." },
      { status: 500 }
    );
  }
}
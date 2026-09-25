"use client";

import { useEffect, useRef, useState } from "react";

type PdfVorschauProps = {
  path: string;
  title: string;
};

export function PdfVorschau({ path, title }: PdfVorschauProps) {
  const src = `/api/wp-media?path=${encodeURIComponent(path)}`;
  const pdfRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const pdf = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) {
          await pdf.destroy();
          return;
        }
        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
      } catch {
        if (!cancelled) {
          setStatus("fallback");
        }
      }
    }

    void loadPdf();
    return () => {
      cancelled = true;
      void pdfRef.current?.destroy();
      pdfRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    let cancelled = false;

    async function renderPage() {
      const pdf = pdfRef.current;
      if (!pdf) {
        return;
      }
      try {
        const current = Math.min(Math.max(page, 1), pdf.numPages);
        const pdfPage = await pdf.getPage(current);
        const viewport = pdfPage.getViewport({ scale: 1.4 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas nicht verfügbar");
        }
        await pdfPage.render({ canvas, canvasContext: context, viewport }).promise;
        if (!cancelled) {
          setImage(canvas.toDataURL("image/png"));
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setStatus("fallback");
        }
      }
    }

    if (pageCount > 0) {
      void renderPage();
    }
    return () => {
      cancelled = true;
    };
  }, [page, pageCount]);

  return (
    <section id="handbuch" className="konzept-pdf">
      <h3 className="text-2xl">Handbuch Kinderschutz</h3>
      <p className="mt-2 text-[var(--muted)]">
        Vorschau des Dokuments – blättern oder das PDF öffnen.
      </p>
      <div className="konzept-pdf-stage">
        <div className="konzept-pdf-sheet" aria-hidden="true" />
        <div className="konzept-pdf-sheet is-mid" aria-hidden="true" />
        <div className="konzept-pdf-paper">
          {status === "ready" && image ? (
            <img src={image} alt={`Vorschau: ${title}, Seite ${page}`} />
          ) : status === "fallback" ? (
            <iframe src={`${src}#view=FitH`} title={`Vorschau ${title}`} />
          ) : (
            <p className="konzept-pdf-loading">Vorschau wird geladen…</p>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {pageCount > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="konzept-pdf-page-btn"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1}
            >
              Zurück
            </button>
            <p className="text-sm font-semibold text-[var(--navy)]">
              Seite {page} von {pageCount}
            </p>
            <button
              type="button"
              className="konzept-pdf-page-btn"
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
              disabled={page >= pageCount}
            >
              Weiter
            </button>
          </div>
        ) : null}
        <a href={src} target="_blank" rel="noreferrer" className="konzept-pdf-download">
          PDF öffnen
        </a>
      </div>
    </section>
  );
}

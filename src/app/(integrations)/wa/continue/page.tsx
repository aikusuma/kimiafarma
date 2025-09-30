import { Button } from "@/components/ui/button";

export default function WhatsAppContinue() {
  const deepLink = "https://wa.me/6281182551?text=Halo%20Kimia%20Farma";

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 md:px-8">
      <header className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Lanjutkan di WhatsApp</h1>
        <p className="text-sm text-muted-foreground">
          Kami siapkan ringkasan cart kamu. Klik tombol di bawah untuk melanjutkan.
        </p>
      </header>

      <section className="border border-border/70 bg-card rounded-none p-5 text-sm shadow-sm">
        <p className="font-semibold">Apa yang terjadi setelah klik?</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          <li>Kami membuka WhatsApp dengan pesan berisi ringkasan pesanan.</li>
          <li>Tim kami mengirimkan invoice final dan link pembayaran.</li>
          <li>Kamu bisa kembali kapan saja ke checkout untuk melanjutkan.</li>
        </ol>
      </section>

      <Button asChild fullWidth size="lg">
        <a href={deepLink} target="_blank" rel="noopener noreferrer">
          Buka WhatsApp
        </a>
      </Button>
    </div>
  );
}

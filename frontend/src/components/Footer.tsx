import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-10 border-t border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/60">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div>
            <h3 className="font-semibold text-lg mb-2">شیراز دارو</h3>
            <p className="text-sm opacity-80">
              ارائه دهنده بهترین محصولات آرایشی و بهداشتی با ضمانت اصالت کالا.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">لینک‌های مفید</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/about" className="hover:underline">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/products" className="hover:underline">
                  همه محصولات
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:underline">
                  مجموعه‌ها
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:underline">
                  سبد خرید
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[color:var(--color-accent)]/20 text-center text-xs opacity-60">
          <p>© {currentYear} تمامی حقوق برای شیراز دارو محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}

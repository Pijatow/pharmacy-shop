export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[color:var(--color-brand)]">
          سوالات متداول
        </h1>
        <p className="mt-2 text-md opacity-80">
          پاسخ به سوالات رایج شما در مورد محصولات و خدمات ما.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">
            چگونه می‌توانم سفارش خود را ثبت کنم؟
          </h3>
          <p className="opacity-90 text-sm">
            [در اینجا نحوه ثبت سفارش را توضیح دهید. برای مثال: کافیست محصول مورد
            نظر خود را به سبد خرید اضافه کرده و سپس با کلیک بر روی دکمه تسویه
            حساب، مراحل پرداخت را دنبال کنید.]
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">
            ارسال سفارشات چقدر زمان می‌برد؟
          </h3>
          <p className="opacity-90 text-sm">
            [در اینجا زمان و نحوه ارسال را توضیح دهید. برای مثال: سفارشات در
            شیراز در کمتر از ۲۴ ساعت و برای سایر شهرها بین ۳ تا ۵ روز کاری ارسال
            می‌شوند.]
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">
            آیا امکان مرجوعی کالا وجود دارد؟
          </h3>
          <p className="opacity-90 text-sm">
            [در اینجا سیاست مرجوعی کالا را شرح دهید. برای مثال: بله، در صورت عدم
            رضایت از کالا تا ۷ روز پس از دریافت، امکان مرجوعی وجود دارد.]
          </p>
        </div>
      </div>
    </div>
  );
}

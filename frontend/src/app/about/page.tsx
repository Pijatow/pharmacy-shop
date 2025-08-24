export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-[color:var(--color-brand)] text-center">
        درباره شیراز دارو
      </h1>
      <div className="space-y-4 opacity-90 text-justify">
        <p>
          اینجا محلی برای متن درباره ما است. لطفاً محتوای مورد نظر خود را برای
          این بخش ارائه دهید.
        </p>
        <p>
          می‌توانید در این بخش به تاریخچه داروخانه، اهداف، ارزش‌ها و خدماتی که
          ارائه می‌دهید اشاره کنید. معرفی تیم و دستاوردها نیز می‌تواند برای
          کاربران جذاب باشد.
        </p>
      </div>
    </div>
  );
}

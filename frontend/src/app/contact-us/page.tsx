export default function ContactUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-[color:var(--color-brand)] text-center">
        تماس با ما
      </h1>
      <div className="space-y-4 opacity-90">
        <p className="text-center">
          شما می‌توانید از طریق راه‌های زیر با ما در ارتباط باشید.
        </p>
        <ul className="space-y-3 list-disc list-inside bg-[color:var(--color-surface)]/40 p-5 rounded-lg border border-[color:var(--color-accent)]/20">
          <li>
            <strong>آدرس:</strong> [آدرس کامل داروخانه شما در اینجا]
          </li>
          <li>
            <strong>تلفن:</strong> [شماره تلفن شما در اینجا]
          </li>
          <li>
            <strong>ایمیل:</strong> [آدرس ایمیل شما در اینجا]
          </li>
          <li>
            <strong>ساعات کاری:</strong> [ساعات کاری شما در اینجا]
          </li>
        </ul>
      </div>
    </div>
  );
}

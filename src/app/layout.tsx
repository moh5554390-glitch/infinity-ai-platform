export const metadata = {
  title: "Infinity AI — Beyond Intelligence",
  description:
    "منصة ذكاء اصطناعي متكاملة تجمع عشرات النماذج الذكية في مكان واحد لإنشاء الصور والفيديوهات والمواقع والتطبيقات والمحتوى.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          * { box-sizing: border-box; }
          body { margin: 0; }
          .infinity-sidebar { display: flex; }
          .infinity-menu-btn { display: none !important; }
          .infinity-main { margin-right: 240px; }
          .infinity-footer { margin-right: 240px; }
          @media (max-width: 900px) {
            .infinity-sidebar { display: none !important; }
            .infinity-menu-btn { display: block !important; }
            .infinity-main { margin-right: 0 !important; }
            .infinity-footer { margin-right: 0 !important; }
          }
        `,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          background: "#05050a",
          color: "#f0f0f5",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}

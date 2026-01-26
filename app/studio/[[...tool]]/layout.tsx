import "@/app/globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          height: "100vh",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}

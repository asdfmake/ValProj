import Header from "@/components/Header"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="winter">
      
      <body>
        <Header />
        {children}
        
      </body>
    </html>
  )
}

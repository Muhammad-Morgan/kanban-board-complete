import { Header } from "@/components/molecule/Header";
import Navbar from "@/components/organisms/Navbar";

export default function TasksLayout({
  children,
}: {
  children: Readonly<{
    children: React.ReactNode;
  }>;
}) {
  return (
    <>
      <Navbar />
      <Header />
      {children}
    </>
  );
}

import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/contexts/ReservationContext";
const josefinFont = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious Cabin hotel , located in the heart of Italian Dolomites , surrounded by beautiful mountains and dark forest",
};
export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefinFont.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 gird">
          <main className="max-w-7xl mx-auto w-full h-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

import { About } from "./About";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Journey } from "./Journey";
import { Navbar } from "./Navbar";
import { SayHello } from "./SayHello";
import { HandDrawnDivider } from "./sketch/HandDrawnDivider";

/** Sections are joined by a drawing rather than a rule or a change of colour. */
function Divider({ align }: { align: "left" | "center" | "right" }) {
  const placement = {
    left: "mr-auto ml-[8%]",
    center: "mx-auto",
    right: "ml-auto mr-[8%]",
  }[align];

  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-16">
      <HandDrawnDivider
        className={`h-4 w-[min(340px,72%)] text-rule ${placement}`}
      />
    </div>
  );
}

export function App() {
  return (
    <div className="relative min-h-svh w-full overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Divider align="left" />
        <About />
        <Divider align="right" />
        <Journey />
        <Divider align="center" />
        <SayHello />
      </main>
      <Footer />
    </div>
  );
}

export default App;

"use client";

import Button from "./Button";

export default function HeroActions() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button variant="primary" onClick={() => scrollTo("packages")}>
        Explore 10 Packages
      </Button>
      <Button variant="outline" onClick={() => scrollTo("about")}>
        Our Story
      </Button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);

  useEffect(() => {
    fetch("/api/one")
      .then((res) => res.json())
      .then((data) => setOne(data.ok));
  }, []);

  useEffect(() => {
    fetch("/api/two")
      .then((res) => res.json())
      .then((data) => setTwo(data.ok));
  }, []);

  return (
    <h1>
      Hello World. One: {one ? "1" : "0"} Two: {two ? "1" : "0"}
    </h1>
  );
}

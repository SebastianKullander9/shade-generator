import ClientHome from "./components/ClientHome";
import { Suspense } from "react";

export default function Page() {
  return (
	<Suspense>
    	<ClientHome />
	</Suspense>
  );
}
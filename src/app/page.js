// import React from "react";

// function page() {
//   return <div>page</div>;
// }

// export default page;



import { redirect } from "next/navigation";

export default function Page() {
  redirect("/home");
}

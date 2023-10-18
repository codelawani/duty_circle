import { getApiDocs } from "../../lib/swagger";
import ReactSwagger from "./react-swagger";
import NoSsrWrapper from "@/src/components/no-ssr";
export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <NoSsrWrapper>
      <section className="container">
        <ReactSwagger spec={spec} />
      </section>
    </NoSsrWrapper>
  );
}

import Date from "@components/date";
import Layout from "@components/layout";
import { getAllPostsIds, getPostData } from "@lib/posts";
import utilStyles from "@styles/utils.module.css";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return { paths, fallback: false };
}

export default function Post({ postData }) {
  const { title, id, date, contentHtml } = postData;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}

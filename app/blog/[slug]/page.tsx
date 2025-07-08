import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Dynamically import the MDX content
  const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`));

  return (
    <div className="p-8">
      <div className="container mx-auto max-w-3xl">
        <nav className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            {post.image && (
              <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={768}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXContent />
          </div>
        </article>

        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metadata: Metadata = {
    title: `${post.title} | pocket science`,
    description: post.description,
    keywords: post.tags,
  };

  if (post.image) {
    metadata.openGraph = {
      title: post.title,
      description: post.description,
      images: [post.image],
    };
  }

  return metadata;
}

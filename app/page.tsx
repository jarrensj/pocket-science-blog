import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Image from "next/image";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">pocket science</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">not advice</p>
        </header>
        <main>
          <div className="grid gap-8 md:gap-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 dark:border-gray-700 pb-8"
              >
                <div className="flex gap-6 mb-4">
                  <div className="flex-shrink-0 w-48 h-36 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={192}
                        height={144}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        ></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{post.author}</span>
                      <span>🍣</span>
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

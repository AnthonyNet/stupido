
import { builder } from "@builder.io/sdk";
import { Metadata } from "next";
import { RenderBuilderContent } from "@/components/builder";
import { UserButton } from "@clerk/nextjs";

// Builder Public API Key set in .env file
builder.init("b9d23eff9b8e44b9ad7b2a02abba7ef7");

interface PageProps {
	params: {
		page: string[];
	};
}

// TODO: No page data, but should be same as in component
// Builder.io doesn't work well with Next.js 13 App Dir
export async function generateMetadata(): Promise<Metadata> {
	const page: any = [];
	const content = await builder
		// Get the page content from Builder with the specified options
		.get("page", {
			userAttributes: {
				// Use the page path specified in the URL to fetch the content
				urlPath: "/" + (page?.join("/") || ""),
			},
		})
		// Convert the result to a promise
		.toPromise();
	const { title, description } = content?.data || {};

	return {
		/*metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),*/
		title,
		description
	};
}

export default async function Page(props: PageProps) {

		const headerContent = await builder
			// Get the page content from Builder with the specified options
			.get("header", {
				userAttributes: {
					// Use the page path specified in the URL to fetch the content
					urlPath: "/" + (props?.params?.page?.join("/") || ""),
				},
				// Set prerender to false to prevent infinite rendering loops
				prerender: false,
			})
			// Convert the result to a promise
			.toPromise();

		const footerContent = await builder
			// Get the page content from Builder with the specified options
			.get("footer", {
				userAttributes: {
					// Use the page path specified in the URL to fetch the content
					urlPath: "/" + (props?.params?.page?.join("/") || ""),
				},
				// Set prerender to false to prevent infinite rendering loops
				prerender: false,
			})
			// Convert the result to a promise
			.toPromise();


	return (
		<>
			{/* Render the Builder page */}
			<RenderBuilderContent
				model="header"
				content={headerContent}
			/>
			<RenderBuilderContent
				model="page"
				content={headerContent}
			/>
			<RenderBuilderContent
				model="footer"
				content={footerContent}
			/>
		</>
	);
}
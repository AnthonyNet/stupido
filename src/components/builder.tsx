// components/builder.tsx
"use client";
// Import BuilderComponent and useIsPreviewing hooks from React
// and DefaultErrorPage from Next
import { builder } from "@builder.io/sdk";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";

// Replace with your Public API Key
builder.init("b9d23eff9b8e44b9ad7b2a02abba7ef7");

// Define an interface for the BuilderPageProps object
// with a `content` property type `any`


export function RenderBuilderContent({ content, model }: {content: any, model: string}) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  // If `content` has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model={model} />;
  }
  return null;
}

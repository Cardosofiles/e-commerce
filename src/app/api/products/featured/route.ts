import data from "../data.json";

export async function GET() {
  // Simulating a delay of 1 second for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filtering the products based on the featured flag
  const featuredProducts = data.products.filter((product) => product.featured);

  // Returning the featured products as a JSON response
  return Response.json(featuredProducts);
}

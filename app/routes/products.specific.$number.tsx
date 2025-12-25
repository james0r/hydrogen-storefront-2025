import { useLoaderData } from "react-router"
import type { Route } from "./+types/products.specific.$number"

export async function loader({context, params, request}: Route.LoaderArgs) {
  const {number} = params;
  const {storefront} = context;
  const {products} = await storefront.query(`#graphql
    query {
      products(first: 5) {
        nodes {
          id
          title
          handle
        }
      }
     }
  `)

  return {
    number,
    products
  };
}

export default function Product() {
  const {number, products} = useLoaderData();
  console.log('loader data: ', number, products)

  return (
    <div>
      <h1>Number: {number}</h1>
      <h2>Products:</h2>
      <ul>
        {products.nodes.map((product: any) => (
          <li key={product.id}>
            <a href={`/products/${product.handle}`}>
              {product.title}
            </a>
          </li>
        ))}
      </ul>
        
    </div>
  );
}
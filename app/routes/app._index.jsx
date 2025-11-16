import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";


export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyReactRouterTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  // ➤ Add toggle state here
  const [showTable, setShowTable] = useState(false);

  const handleNewFunction = () => {
    setShowTable(true);
  };
  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data?.product?.id, shopify]);

  return (
    <s-page heading="PowerX - Functions">
      <s-stack direction="block" gap="base">
        <s-section heading="What's PowerX - Functions Creator?">
          <s-grid
            gridTemplateColumns="repeat(5,1fr)"
            justifyContent="center"
            alignItems="center"
          >
            <s-grid-item gridColumn="span 4">
              <s-paragraph>
                All-in-one Functions engine for Shopify: advanced discounts,
                delivery & payment rules, cart transforms, and Plus-only
                checkout control.
              </s-paragraph>
            </s-grid-item>

            <s-grid-item gridColumn="span 1">
              <s-box>
                <s-image
                  src="https://cdn.shopify.com/s/files/1/0914/0102/7889/files/Main_Featured-sm-v2.jpg?v=1741609098)"
                  alt="Featured product"
                  aspectRatio="1/0.5"
                  inlineSize="auto"
                  objectFit="cover"
                  loading="lazy"
                />
              </s-box>

              <s-button variant="primary" icon="play">
                6:51
              </s-button>
            </s-grid-item>
            <s-grid gridTemplateColumns="repeat(2,1fr)" gap="base" padding="0">
              <s-box padding="0">
                <s-butto icon="circle" variant="secondary">
                  Quick guide
                </s-butto>
              </s-box>
              <s-box padding="0">
                <s-link>more video</s-link>
              </s-box>
            </s-grid>
          </s-grid>
        </s-section>

        <s-section heading="App embed">
          <s-paragraph padding="base">
            Enabling app embed will allow you to track URL based discounts and
            discount codes. This option is required for UTM tracking.
            Recommended
          </s-paragraph>
          <s-box maxInlineSize="350px">
            <s-grid gridTemplateColumns="repeat(2,1fr)" gap="0">
              <s-button variant="primary">Activate app embed</s-button>
              <s-link>Verify app embed</s-link>
            </s-grid>
          </s-box>
        </s-section>

        <s-grid gridTemplateColumns="repeat(3,1fr)" gap="base">
          <s-section>
            <s-stack direction="inline" gap="base">
              <s-icon type="discount-add" tone="success"></s-icon>
              <s-text type="strong">Discounts Functions</s-text>
            </s-stack>
            <s-paragraph>
              Offer discounts on products, orders, and shipping with functions.
            </s-paragraph>
            <s-box maxInlineSize="150px">
              <s-grid gridTemplateColumns="repeat(2,1fr)">
                <s-button>Create</s-button>
                <s-button>Guide</s-button>
              </s-grid>
            </s-box>
          </s-section>
          <s-section>
            <s-stack direction="inline" gap="base">
              <s-icon type="credit-card" tone="success"></s-icon>
              <s-text type="strong">Checkout Customization Functions</s-text>
            </s-stack>
            <s-paragraph>
              Customize checkout shipping, payment, and validation with
              functions.
            </s-paragraph>
            <s-box maxInlineSize="150px">
              <s-grid gridTemplateColumns="repeat(2,1fr)">
                <s-button>Create</s-button>
                <s-button>Guide</s-button>
              </s-grid>
            </s-box>
          </s-section>
          <s-section>
            <s-stack direction="inline" gap="base">
              <s-icon type="plus-circle-down" tone="success"></s-icon>
              <s-text type="strong">More Functions</s-text>
            </s-stack>
            <s-paragraph>
              Advanced discount management and cart transformations with
              functions.
            </s-paragraph>
            <s-box maxInlineSize="150px">
              <s-grid gridTemplateColumns="repeat(2,1fr)">
                <s-button>Create</s-button>
                <s-button>Guide</s-button>
              </s-grid>
            </s-box>
          </s-section>

          <s-section>
            <s-heading>Active Campaigns</s-heading>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />{" "}
              <s-text type="strong">0</s-text>
            </s-stack>
          </s-section>
          <s-section>
            <s-heading>Inactive Campaigns</s-heading>
            <s-stack direction="inline" gap="base">
              <s-icon type="incomplete" tone="success" />{" "}
              <s-text type="strong">0</s-text>
            </s-stack>
          </s-section>
          <s-section>
            <s-heading>Total Discount Usage</s-heading>
            <s-stack direction="inline" gap="base">
              <s-icon type="discount" tone="success" />{" "}
              <s-text type="strong">0</s-text>
            </s-stack>
          </s-section>
        </s-grid>

        <s-section>
          <s-box>
            <s-stack direction="block" gap="base">
              <s-stack direction="inline" justifyContent="space-between">
                <s-heading>Functions</s-heading>

                <s-button-group gap="none">
                  <s-button slot="secondary-actions">All</s-button>
                  <s-button slot="secondary-actions">Discount</s-button>
                  <s-button slot="secondary-actions">Delivery</s-button>
                  <s-button slot="secondary-actions">Payment</s-button>
                  <s-button slot="secondary-actions">Validation</s-button>
                  <s-button slot="secondary-actions">Discount Manager</s-button>
                </s-button-group>
              </s-stack>

              <s-divider />
            </s-stack>

            <s-stack padding="base">
              <s-heading>
                <h3>Details</h3>
              </s-heading>
              <s-pragraph>
                You can use different types of functions to customize the cart
                and checkout experience. We have different types of functions
                like product discount, order discount, shipping discount,
                delivery customization, payment customization, and validation.
              </s-pragraph>
            </s-stack>
          </s-box>

          <s-stack direction="block" gap="base">
          <s-box border="base" padding="base" borderRadius="base">
            <s-stack direction="inline" justifyContent="space-between">
              <s-box inlineSize="760px">
                <s-search-field
                  label="Search"
                  labelAccessibilityVisibility="exclusive"
                  placeholder="Search function"
                />
              </s-box>
              <s-button
                icon="plus"
                variant="primary"
                onClick={handleNewFunction}
              >
                New function
              </s-button>
            </s-stack>

            {!showTable ? (
              <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
                <s-box
                  maxInlineSize="400px"
                  maxBlockSize="400px"
                  blockSize="300px"
                >
                  <s-image
                    aspectRatio="1/0.5"
                    src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    alt="A stylized graphic of four characters, each holding a puzzle piece"
                  />
                </s-box>
                <s-grid justifyItems="center" maxInlineSize="450px" gap="base">
                  <s-stack alignItems="center" gap="base">
                    <s-heading>Create your first function!</s-heading>
                    <s-paragraph>
                      Create a function to offer more campaigns or rules
                    </s-paragraph>

                    <s-button variant="primary">Create new function</s-button>
                  </s-stack>
                </s-grid>
              </s-grid>
              
            ) : (
              
              <s-box padding="base">
                <s-table>
                  <s-table-header-row>
                    <s-table-header>All</s-table-header>
                    <s-table-header>Discount</s-table-header>
                    <s-table-header>Delivery</s-table-header>
                    <s-table-header>Payment</s-table-header>
                    <s-table-header>Validation</s-table-header>
                    <s-table-header>Discont Manager</s-table-header>
                  </s-table-header-row>
                  <s-table-body>
                    <s-table-row>
                      <s-table-cell>John Smith</s-table-cell>
                      <s-table-cell>john@example.com</s-table-cell>
                      <s-table-cell>23</s-table-cell>
                      <s-table-cell>123-456-7890</s-table-cell>
                      <s-table-cell>123-456-7890</s-table-cell>
                      <s-table-cell>123-456-7890</s-table-cell>
                    </s-table-row>
                    <s-table-row>
                      <s-table-cell>John Smith</s-table-cell>
                      <s-table-cell>john@example.com</s-table-cell>
                      <s-table-cell>23</s-table-cell>
                      <s-table-cell>123-456-7890</s-table-cell>
                      <s-table-cell>123-456-7890</s-table-cell>
                      <s-table-cell>123-456-7890</s-table-cell>
                    </s-table-row>
                  </s-table-body>
                </s-table>
              </s-box>
            )}
          </s-box>
          </s-stack>
        </s-section>
        <s-section heading="Need help or missing a feature?">
          <s-grid gridTemplateColumns="repeat(10,1fr)" alignItems="center">
            <s-grid-item gridColumn="span 9">
              <s-text>
                Our team is here to help. Contact us and we will get back to you
                as soon as possible. Request a feature or report an issue and it
                will resolved in a few hours not days
              </s-text>
            </s-grid-item>
            <s-grid-item gridColumn="span 1">
              <s-image
                src="https://cdn.shopify.com/s/files/1/0585/8616/9399/files/technical-support.png?v=1743851740"
                alt="Featured product"
                aspectRatio="1/1"
                inlineSize="auto"
                objectFit="cover"
                loading="lazy"
              />
            </s-grid-item>
          </s-grid>

          <s-button>contact@codeinspire.io</s-button>
          <s-button>watch videos</s-button>
        </s-section>
      </s-stack>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

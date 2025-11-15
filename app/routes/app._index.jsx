import { useEffect } from "react";
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
  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data?.product?.id, shopify]);

  return (
    <s-page heading="PowerX - Functions">
      <s-section heading="What's PowerX - Functions Creator?">
        <s-paragraph>
          All-in-one Functions engine for Shopify: advanced discounts, delivery
          & payment rules, cart transforms, and Plus-only checkout control.
        </s-paragraph>
        <s-box>
          <s-box>
            <s-image
              src="https://cdn.shopify.com/s/files/1/0914/0102/7889/files/Main_Featured-sm-v2.jpg?v=1741609098)"
              alt="Featured product"
              aspectRatio="16/9"
              objectFit="cover"
              loading="lazy"
            />
          </s-box>

          <s-button  variant="primary"
          icon="play"
          >
         6:51
          </s-button>
        </s-box>
        <s-box>
          <s-butto icon="circle"
          variant="secondary"
          >
           Quick guide
          </s-butto>
        </s-box>
      </s-section>

      <s-section padding="none">
        <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
          <s-box maxInlineSize="400px" maxBlockSize="400px" blockSize="300px">
            <s-image
              aspectRatio="1/0.5"
              src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              alt="A stylized graphic of four characters, each holding a puzzle piece"
            />
          </s-box>
          <s-grid justifyItems="center" maxInlineSize="450px" gap="base">
            <s-stack alignItems="center">
              <s-heading>Create your announcement</s-heading>
            </s-stack>
            <s-button-group>
              <s-button
                slot="secondary-actions"
                aria-label="Learn more about creating puzzles"
              >
                {" "}
                Announcement list{" "}
              </s-button>
              <s-button
                slot="primary-action"
                variant="primary"
                aria-label="Add a new puzzle"
              >
                {" "}
                Create announcement{" "}
              </s-button>
            </s-button-group>
            <s-grid gridTemplateColumns="repeat(2,1fr)" gap="large-500">
              <s-box
                padding="base"
                background="white"
                borderWidth="base"
                borderColor="base"
                borderRadius="base"
                blockSize="80px"
                inlineSize="400px"
                textAlign="center"
              >
                <s-stack alignItems="center" justifyContent="center">
                  Announcement Bar
                </s-stack>
              </s-box>

              <s-box
                padding="base"
                background="white"
                borderWidth="base"
                blockSize="80px"
                inlineSize="400px"
                textAlign="center"
              >
                <s-stack alignItems="center" justifyContent="center">
                  Active Announcement-Bar
                </s-stack>
              </s-box>
            </s-grid>
          </s-grid>
        </s-grid>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};

{
  /* <div class="Polaris-VideoThumbnail__ThumbnailContainer">
  <div
    class="Polaris-VideoThumbnail__Thumbnail"
    style="background-image:url(https://cdn.shopify.com/s/files/1/0914/0102/7889/files/Main_Featured-sm-v2.jpg?v=1741609098)"
  ></div>
  <button
    type="button"
    class="Polaris-VideoThumbnail__PlayButton"
    aria-label="Play video of length 6 minutes and 51 seconds"
     >
    <div class="Polaris-VideoThumbnail__Timestamp">
      <div class="Polaris-LegacyStack Polaris-LegacyStack--spacingExtraTight Polaris-LegacyStack--alignmentCenter">
        <div class="Polaris-LegacyStack__Item">
          <span class="Polaris-VideoThumbnail__PlayIcon">
            <span class="Polaris-Icon">
              <svg
                viewBox="1 1 18 18"
                class="Polaris-Icon__Svg"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M15.375 8.485c1.167.674 1.167 2.358 0 3.031l-7.5 4.33c-1.167.674-2.625-.168-2.625-1.515v-8.66c0-1.348 1.458-2.19 2.625-1.516l7.5 4.33Zm-.75 1.732a.25.25 0 0 0 0-.433l-7.5-4.33a.25.25 0 0 0-.375.217v8.66a.25.25 0 0 0 .375.216l7.5-4.33Z"
                ></path>
              </svg>
            </span>
          </span>
        </div>
        <div class="Polaris-LegacyStack__Item">
          <p class="Polaris-Text--root Polaris-Text--bodyLg Polaris-Text--semibold">
            6:51
          </p>
        </div>
      </div>
    </div>
  </button>
</div>; */
}




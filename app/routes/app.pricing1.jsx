export default function MyPricings() {
  return (
    <s-page heading=" PowerX - Functions">
      <s-stack direction="block" padding="base" gap="base">
        <s-stack paddingBlockEnd="large-500">
          <s-heading>Pricing Page</s-heading>
        </s-stack>
        <s-section heading="lease select a plan that suits your business">
          <s-stack
            direction="inline"
            justifyContent="space-between"
            alignItems="center"
          >
            <s-box maxInlineSize="500px">
              <s-paragraph>
                You are currently on the Free plan and have limited access to
                all the features. Please read the <s-link>FAQ </s-link> page for
                more information.
              </s-paragraph>
            </s-box>
            <s-box maxInlineSize="100px" maxBlockSize="200px">
              <s-image
                src="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/bill.png?v=1685711340"
                alt="Featured product"
                aspectRatio="1/1"
                inlineSize="auto"
                objectFit="cover"
                loading="lazy"
              />
            </s-box>
          </s-stack>
        </s-section>
        <s-grid gridTemplateColumns="repeat(3,1fr)" gap="base">
          <s-section>
            <s-heading>Starter</s-heading>
            <s-paragraph>
              <s-text type="strong">Free</s-text>/ month
            </s-paragraph>
            <s-paragraph>For small business</s-paragraph>
            <s-divider></s-divider>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Discount functions</s-text>
            </s-stack>

            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Payment functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Shipping functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Validations functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>3 campaigns per functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>3 rules per function</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Limited features</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Basic support</s-text>
            </s-stack>
            <s-stack paddingBlockStart="base" paddingInline="large-100">
              <s-button variant="primary">
                Upgrade to unclock all feature
              </s-button>
            </s-stack>
          </s-section>
          <s-section>
            <s-heading>Professional</s-heading>
            <s-paragraph>
              <s-text type="strong">$39</s-text>/ month
            </s-paragraph>
            <s-paragraph>For growing business</s-paragraph>
            <s-divider></s-divider>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Discount functions</s-text>
            </s-stack>

            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Payment functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Shipping functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Validations functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>10 campaigns per function</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>10 rules per function</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Fast email support</s-text>
            </s-stack>
            <s-stack paddingBlockStart="base" paddingInline="large-500">
              <s-button variant="primary">start 3-days trila</s-button>
            </s-stack>
          </s-section>
          <s-section>
            <s-heading>Premium</s-heading>
            <s-paragraph>
              <s-text type="strong">$99</s-text>/ month
            </s-paragraph>
            <s-paragraph>Shopify Plus</s-paragraph>
            <s-divider></s-divider>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Discount functions</s-text>
            </s-stack>

            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Payment functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Shipping functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Validations functions</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Unlimited campaigns & rules</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Priority email support</s-text>
            </s-stack>
            <s-stack direction="inline" gap="base">
              <s-icon type="check-circle" tone="success" />
              <s-text>Scripts to Functions migration </s-text>
            </s-stack>
            <s-stack direction="block" paddingBlockStart="base" paddingInline="large-500">
              <s-button variant="primary">start 3-days trila</s-button>
            </s-stack>


           
          </s-section>
        </s-grid>
        
        <s-section heading="Need help or missing a feature?">
          <s-grid gridTemplateColumns="repeat(10,1fr)" alignItems="center">
            <s-grid-item gridColumn="span 9">
              <s-stack padding="base">
                <s-paragraph>
                  Our team is here to help. Contact us and we will get back to
                  you as soon as possible. Request a feature or report an issue
                  and it will resolved in a few hours not days
                </s-paragraph>
              </s-stack>
              <s-box maxInlineSize="450px">
                <s-grid gridTemplateColumns="repeat(2,1fr)">
                  <s-button>
                    {" "}
                    <s-stack direction="inline">
                      <s-icon type="email" />
                      <s-text>contact@codeinspire.io</s-text>
                    </s-stack>
                  </s-button>
                  <s-button>watch videos</s-button>
                </s-grid>
              </s-box>
            </s-grid-item>
            <s-grid-item gridColumn="span 1">
              <s-image
                src="https://cdn.shopify.com/s/files/1/0585/8616/9399/files/technical-support.png?v=1743851740"
                alt="Featured product"
                aspectRatio="1"
                inlineSize="auto"
                objectFit="cover"
                loading="lazy"
              />
            </s-grid-item>
          </s-grid>
        </s-section>

        
      </s-stack>
    </s-page>
  );
}

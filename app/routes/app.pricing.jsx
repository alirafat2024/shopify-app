import  { useState } from "react";
import {
  AppProvider,
  Page,
  BlockStack,
  InlineGrid,
  Box,
  Text,
  Card,
  TextField,
  Divider,
  Button,
  useBreakpoints,
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import { useLoaderData, Form, useActionData } from "react-router-dom";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ✅ Loader to fetch settings from Prisma
export async function loader() {
  try {
    const settings = await db.settings.findFirst();
    console.log("settings.............>", settings);
    return settings || { name: "", description: "" };
  } catch (error) {
    console.error("Loader error:", error);
    return { name: "", description: "" };
  } finally {
    await db.$disconnect();
  }
}

// ✅ Action to handle form submissions
export async function action({ request }) {
  const formData = await request.formData();
  const settingsData = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  try {
    // Update or create settings
    let settings = await db.settings.findFirst();
    if (settings) {
      settings = await db.settings.update({
        where: { id: settings.id },
        data: settingsData,
      });
    } else {
      settings = await db.settings.create({ data: settingsData });
    }

    return { message: "Settings updated successfully!", settings };
  } catch (error) {
    console.error("Action error:", error);
    return { message: "Error updating settings." };
  } finally {
    await db.$disconnect();
  }
}

function PricingPage() {
  const settings = useLoaderData() || {};
  const actionData = useActionData();
  const { smUp } = useBreakpoints();
  const [formState, setFormState] = useState(settings);

  return (
    <Page title="Pricing">
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Pricing
              </Text>
              <Text as="p" variant="bodyMd">
                Update app pricing and preferences
              </Text>
            </BlockStack>
          </Box>

          <Card roundedAbove="sm">
            <Form method="post">
              <BlockStack gap="400">
                <TextField
                  label="App name"
                  name="name"
                  value={formState.name || ""}
                  onChange={(value) =>
                    setFormState((prev) => ({ ...prev, name: value }))
                  }
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formState.description || ""}
                  onChange={(value) =>
                    setFormState((prev) => ({ ...prev, description: value }))
                  }
                  autoComplete="off"
                />
                <Button submit>Save</Button>

                {actionData?.message && (
                  <Text tone="success">{actionData.message}</Text>
                )}
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>

        {smUp && <Divider />}
      </BlockStack>
    </Page>
  );
}

export default function Pricing() {
  return (
    <AppProvider i18n={en}>
      <PricingPage />
    </AppProvider>
  );
}

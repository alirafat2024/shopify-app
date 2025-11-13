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
  useBreakpoints,
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

function SettingsPage() {
  const { smUp } = useBreakpoints(); // For responsive behavior

  return (
    <Page title="Settings">
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        {/* InterJambs Section */}
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzle piece.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid>

        {smUp && <Divider />}

        {/* Dimensions Section */}
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Define the horizontal and vertical dimensions of your puzzle.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Horizontal" />
              <TextField label="Vertical" />
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
     
    </Page>
  );
}

// ✅ Wrap the settings page in AppProvider
export default function Settings() {
  return (
    <AppProvider i18n={en}>
      <SettingsPage />
    </AppProvider>
  );
}

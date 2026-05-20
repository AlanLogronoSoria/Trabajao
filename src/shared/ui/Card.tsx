import { Button, H3, Paragraph, Card as TamaguiCard, XStack } from 'tamagui';

export const Card = ({ title, description, onDelete }: any) => (
  <TamaguiCard
    elevation="$4"
    size="$4"
    padding="$4"
    margin="$2"
    borderWidth={1}
    borderColor="$borderColor"
    borderRadius="$4"
  >
    <H3>{title}</H3>

    <Paragraph>{description}</Paragraph>

    <XStack justifyContent="flex-end">
      <Button onPress={onDelete} theme="red">
        Eliminar
      </Button>
    </XStack>
  </TamaguiCard>
);
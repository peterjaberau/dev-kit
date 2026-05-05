"use client";

import { chakra, Separator, useSlotRecipe } from "@chakra-ui/react";
import type { RecipeVariantProps } from "@chakra-ui/react";
import type React from "react";
import { itemRecipe } from "./recipe";

type ItemRecipeVariantProps = RecipeVariantProps<typeof itemRecipe>;

export const ItemGroup = (props: React.ComponentProps<typeof chakra.div>) => {
  const { className, ...rest } = props;

  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();

  return (
    <chakra.div
      css={styles.group}
      className={className}
      data-slot="group"
      role="list"
      {...rest}
    />
  );
};

export const ItemSeparator = (props: React.ComponentProps<typeof Separator>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();

  return (
    <Separator
      css={styles.separator}
      className={className}
      data-slot="separator"
      orientation="horizontal"
      {...rest}
    />
  );
};

interface ItemProps
  extends React.ComponentProps<typeof chakra.div>,
    Pick<ItemRecipeVariantProps, "variant"> {}

export const Item = (props: ItemProps) => {
  const { variant = "plain", css, className, ...rest } = props;

  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe({ variant });

  return (
    <chakra.div
      css={{
        ...styles.root,
        ...css
      }}
      className={className}
      data-slot="root"
      data-variant={variant}
      {...rest}
    />
  );
};

interface ItemMediaProps
  extends React.ComponentProps<typeof chakra.div> {
  variant?: ItemRecipeVariantProps["mediaType"];
}

export const ItemMedia = (props: ItemMediaProps) => {
  const { variant = "plain", className, ...rest } = props;

  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe({ mediaType: variant });

  return (
    <chakra.div
      css={styles.media}
      className={className}
      data-slot="media"
      data-variant={variant}
      {...rest}
    />
  );
};

export const ItemContent = (props: React.ComponentProps<typeof chakra.div>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();

  return (
    <chakra.div
      css={styles.content}
      className={className}
      data-slot="content"
      {...rest}
    />
  );
};

export const ItemTitle = (props: React.ComponentProps<typeof chakra.div>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();
  return (
    <chakra.div
      css={styles.title}
      className={className}
      data-slot="title"
      {...rest}
    />
  );
};

export const ItemDescription = (props: React.ComponentProps<typeof chakra.p>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();
  return (
    <chakra.p
      css={styles.description}
      className={className}
      data-slot="description"
      {...rest}
    />
  );
};

export const ItemActions = (props: React.ComponentProps<typeof chakra.div>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();
  return (
    <chakra.div
      css={styles.actions}
      className={className}
      data-slot="actions"
      {...rest}
    />
  );
};

export const ItemHeader = (props: React.ComponentProps<typeof chakra.div>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();
  return (
    <chakra.div
      css={styles.header}
      className={className}
      data-slot="header"
      {...rest}
    />
  );
};

export const ItemFooter = (props: React.ComponentProps<typeof chakra.div>) => {
  const { className, ...rest } = props;
  const recipe = useSlotRecipe({ recipe: itemRecipe });
  const styles = recipe();
  return (
    <chakra.div
      css={styles.footer}
      className={className}
      data-slot="footer"
      {...rest}
    />
  );
};

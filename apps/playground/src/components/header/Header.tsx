import { Group, Title } from "@mantine/core";
import { FC } from "react";

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <Group bg="#000" h="100%" px="md" style={{ userSelect: "none" }}>
      <Title c="#efefef">Mercedes Benz Tech Innovation</Title>
    </Group>
  );
};
